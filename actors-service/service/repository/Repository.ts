import { Request, Response, NextFunction } from 'express';
import * as Actor                          from '../models/Actor';
import { verify }                          from 'jsonwebtoken';
import { MongoDbConnection }               from '../dbconnection/MongoDbConnection';

let mongoDb = new MongoDbConnection();
mongoDb.connect();

export class Repository {

    public getByName (req: Request, res: Response, next: NextFunction) {
        let name = req.params.name;
        let query = { name: name };
        Actor.findOne(query, (err, actor) => {
            if (err) {
                res.json({ message: 'Error during find Actor', status: res.status, error: err });
            }
            if (actor) {
                res.json({ message: 'Actor found successfully', status: res.status, data: actor });
            } else {
                res.json({ message: 'Actor not found with name: ' + name, status: res.status });
            }
        });
    }

    public getById (req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let query = { id: id };
        Actor.findOne (query, (err, actor) => {
            if (err) {
                res.json({ message: 'Error during find Actor', status: res.status, error: err });
            }
            if (actor) {
                res.json({ message: 'Actor found successfully', status: res.status, data: actor });
            } else {
                res.json({ message: 'Actor not found with id: ' + id, status: res.status });
            }
        });
    }

    public addActor (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
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
        }
    }
}