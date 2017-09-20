import * as path       from 'path';
import * as express    from 'express';
import * as logger     from 'morgan';
import * as bodyParser from 'body-parser';
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
    }

    initProxy() {
        let repository = new Repository();
        repository.registerRoutes(this.express);
    }
}

export default new App().express;