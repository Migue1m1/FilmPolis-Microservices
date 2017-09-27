import { Repository } from '../repository/Repository';
import { Router }     from 'express';

export class DirectorRouter {
    router: Router;
    repository: Repository;

  /**
   * Initialize the DirectorRouter
   */
    constructor () {
        this.router = Router();
        this.repository = new Repository();
        this.init();
    }

    

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init () {
        this.router.get('/suggestions/:text', this.repository.getSuggestions);
        this.router.get('/:name', this.repository.getByName);
        this.router.get('/id/:id', this.repository.getById);
        this.router.post('/id', this.repository.getDirectorsById);
        this.router.post('/add', this.repository.addDirector);
    }
}

// Create the DirectorRouter, and export its configured Express.Router
const directorRouter = new DirectorRouter();
directorRouter.init();

export default directorRouter.router;