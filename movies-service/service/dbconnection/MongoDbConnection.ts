import * as mongoDb      from 'mongoose';
import { IDbConnection } from './IDbConnection';
import * as fs           from 'fs';

const secret = 'hjg29ig9RbBQ]qAa6}uy#r$h$j*?fgd@ijYj/6%9{=gfgJGD[ESVVUY|&%&*';

class MongoDbConnection implements IDbConnection {
    open() {

    }

    close() {

    }

    connect() {
        let dbName = "moviesdb";
        let username = "";
        let password = "";

        let certificateSsl = [fs.readFileSync("./ssl/mongodb.pem")];

        let serverURI = "miguel:123456@ds141474.mlab.com:41474/" + dbName;
        let repl1 = "192.168.1.105:27017";
        let repl2 = "192.168.1.106:27017";
        let repl3 = "192.168.1.107:27017";

        let dbURI = "mongodb://" + serverURI;// + "," + repl1 + "," + repl2 + "," + repl3;

        var options = {

            db: {
                native_parser: true
            },

            // This block gets run for a non replica set connection string (eg. localhost with a single DB)
            server: {
                poolSize: 5,
                reconnectTries: Number.MAX_VALUE,
                ssl: false,
                sslValidate: false,
                //sslCA: certificateSsl,
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 30000
                }
            }/*,

            // This block gets run when the connection string indicates a replica set (comma seperated connections)
            replset: {
                auto_reconnect: false,
                poolSize: 10,
                connectWithNoPrimary: true,
                ssl: true,
                sslValidate: false,
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 30000
                }
            }*/,

            user: username,
            pass: password
        };

        mongoDb.connect(dbURI, options); 

        // CONNECTION EVENTS
        // When successfully connected
        mongoDb.connection.on('connected', function () {  
            console.log('Mongoose default connection open to ' + dbURI);
        }); 

        // If the connection throws an error
        mongoDb.connection.on('error', function (err: any) {  
            console.log('Mongoose default connection error: ' + err);
        }); 

        // When the connection is disconnected
        mongoDb.connection.on('disconnected', function () {  
            console.log('Mongoose default connection disconnected'); 
        });

        // If the Node process ends, close the Mongoose connection 
        process.on('SIGINT', function() {  
            mongoDb.connection.close(function () { 
                console.log('Mongoose default connection disconnected through app termination'); 
                process.exit(0); 
            }); 
        });
    }

    getSecret() {
        return secret;
    }
}

export { MongoDbConnection };