import { Repository } from '../repository/Repository';
import { Router }     from 'express';

export class UserRouter {
    router: Router
    repository: Repository;

  /**
   * Initialize the UserRouter
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
        this.router.post('/signin', this.repository.registerUser);
        this.router.post('/login', this.repository.authenticateUser);
        this.router.post('/logout', this.repository.logOut);
    }
}

// Create the UserRouter, and export its configured Express.Router
const userRouter = new UserRouter();
userRouter.init();

export default userRouter.router;