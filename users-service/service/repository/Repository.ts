import { Request, Response, NextFunction } from 'express';
import * as User                           from '../models/User';
import { sign   }                          from 'jsonwebtoken';
import { MongoDbConnection }               from '../dbconnection/MongoDbConnection';

let mongoDb = new MongoDbConnection();
mongoDb.connect();

export class Repository {

    public async registerUser (req: Request, res: Response, next: NextFunction) {
        let userReq = req.body;
        let query = { username: userReq.username };
        await User.findOne(query, (err, user) => {
            if (err) {
                return res.status(400).json({ message: 'Error during find User', status: 400, error: err });
            }
            if (user) {
                res.status(400).json({ message: 'This user already exists!', status: 400 });
            }
            else {
                let newUser = new User();
                newUser.username = userReq.username;
                newUser.password = newUser.genEncryptedPassword(userReq.password);

                newUser.save((err) => {
                    if (err) {
                        res.status(400).json({ message: 'Error during save User', status: 400, error: err });
                    }
                    res.status(201).json({ message: 'Registered user succesfully', status: 201 });
                });
            }
        });
    }

    public authenticateUser (req: any, res: Response, next: NextFunction) {
        let userReq = req.body;
        let query = { username: userReq.username };
        User.findOne (query, (err, user) => {
            if (err) {
                return res.status(400).json({ message: 'Error during find User', status: 400, error: err });
            }
            if (user && user.validPassword(userReq.password)) {
                let token = sign({ username: user.username, userId: user.id }, mongoDb.getSecret());
                
                res.status(200).json({ message: 'Log In successfully', status: 200, data: { userId: user.id, token: token } });
            } else {
                res.status(401).json({ message: 'The user name or password are wrong!', status: 401 });
            }
        });
    }

    public logOut (req: Request, res: Response, next: NextFunction) {
        /*let body = req.body;
        let token = req.body.token || req.query.token || req.headers['x-acces-token'];

        if (token) {
            verify (token, mongoDb.getSecret(), (tokenError: any) => {
                if (tokenError) {
                    return res.json({ message: 'Filed to authenticate token', status: res.status });
                }
                return res.json({ message: 'Actor added', status: res.status });
            });
        }
        else {
            return res.json({ message: 'Invalid token, please Log in first', status: res.status })
        }*/
    }
}