import * as path       from 'path';
import * as express    from 'express';
import * as logger     from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors       from 'cors';
import { Repository }  from '../repository/Repository';

// Creates and configures an ExpressJS web server.
class App {
    
    // ref to Express instance
    public express: express.Application;

    constructor () {
        this.express = express();
        this.middleware();
        this.initProxy();
    }

    middleware () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Accept,Authorization,Content-Type,X-Requested-With,Range,Origin');
            
            if (req.method === 'OPTIONS')
                return res.sendStatus(200);
            return next();
        });
    }

    initProxy() {
        let repository = new Repository();
        repository.registerRoutes(this.express);
    }
}

export default new App().express;