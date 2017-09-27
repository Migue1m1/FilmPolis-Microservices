import { Repository } from '../repository/Repository';
import { Router }     from 'express';

export class MovieRouter {
    router: Router;
    repository: Repository;

  /**
   * Initialize the MovieRouter
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
        this.router.get('/:title', this.repository.getByTitle);
        this.router.get('/suggestions/:text', this.repository.getSuggestions);
        this.router.get('/imdbId/:imdbId', this.repository.getByImdbId);
        this.router.post('/add', this.repository.addMovie);
    }
}

// Create the MovieRouter, and export its configured Express.Router
const movieRouter = new MovieRouter();
movieRouter.init();

export default movieRouter.router;