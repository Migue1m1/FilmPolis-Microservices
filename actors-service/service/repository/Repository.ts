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
                res.status(400).json({ message: 'Error during find Actor', status: 400, error: err });
            }
            if (actor) {
                res.status(200).json({ message: 'Actor found successfully', status: 200, data: actor });
            } else {
                res.status(404).json({ message: 'Actor not found with name: ' + name, status: 404 });
            }
        });
    }

    public getById (req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let query = { id: id };
        Actor.findOne (query, (err, actor) => {
            if (err) {
                res.status(400).json({ message: 'Error during find Actor', status: 400, error: err });
            }
            if (actor) {
                res.status(200).json({ message: 'Actor found successfully', status: 200, data: actor });
            } else {
                res.status(404).json({ message: 'Actor not found with id: ' + id, status: 404 });
            }
        });
    }

    public addActor (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let token = req.body.token || req.query.token || req.headers['x-acces-token'];

        if (token) {
            verify (token, mongoDb.getSecret(), (tokenError: any) => {
                if (tokenError) {
                    return res.status(403).json({ message: 'Failed to authenticate token', status: 403 });
                }
                return res.status(201).json({ message: 'Actor added', status: 201 });
            });
        }
        else {
            return res.status(403).json({ message: 'Invalid token, please Log in first', status: 403 })
        }
    }
}