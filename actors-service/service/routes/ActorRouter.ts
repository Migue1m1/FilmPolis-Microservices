import { Repository } from '../repository/Repository';
import { Router }     from 'express';

export class ActorRouter {
    router: Router
    repository: Repository;

  /**
   * Initialize the ActorRouter
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
        this.router.get('/:name', this.repository.getByName);
        this.router.get('/id/:id', this.repository.getById);
        this.router.post('/id', this.repository.getActorsById)
        this.router.post('/add', this.repository.addActor);
    }
}

// Create the ActorRouter, and export its configured Express.Router
const actorRouter = new ActorRouter();
actorRouter.init();

export default actorRouter.router;