import * as path       from 'path';
import * as express    from 'express';
import * as logger     from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors       from 'cors';
import MovieRouter     from '../routes/MovieRouter';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
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

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Welcome to FilmPolis\' Api!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/movies', MovieRouter);
    }
}

export default new App().express;