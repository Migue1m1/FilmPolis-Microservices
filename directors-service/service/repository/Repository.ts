import { Request, Response, NextFunction } from 'express';
import * as Director                       from '../models/Director';
import { verify }                          from 'jsonwebtoken';
import { MongoDbConnection }               from '../dbconnection/MongoDbConnection';

let mongoDb = new MongoDbConnection();
mongoDb.connect();

export class Repository {

    public getByName (req: Request, res: Response, next: NextFunction) {
        let name = req.params.name;
        let query = { name: name };
        Director.findOne(query, (err, director) => {
            if (err) {
                res.status(400).json({ message: 'Error during find Director', status: 400, error: err });
            }
            if (director) {
                res.status(200).json({ message: 'Director found successfully', status: 200, data: director });
            } else {
                res.status(404).json({ message: 'Director not found with name: ' + name, status: 404 });
            }
        });
    }

    public getById (req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let query = { id: id };
        Director.findOne (query, (err, director) => {
            if (err) {
                res.status(400).json({ message: 'Error during find Director', status: 400, error: err });
            }
            if (director) {
                res.status(200).json({ message: 'Director found successfully', status: 200, data: director });
            } else {
                res.status(404).json({ message: 'Director not found with id: ' + id, status: 404 });
            }
        });
    }

    public addDirector (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let token = req.body.token || req.query.token || req.headers['x-acces-token'];

        if (token) {
            verify (token, mongoDb.getSecret(), (tokenError: any) => {
                if (tokenError) {
                    return res.status(403).json({ message: 'Failed to authenticate token', status: 403 });
                }
                return res.status(201).json({ message: 'Director added', status: 201 });
            });
        }
        else {
            return res.status(403).json({ message: 'Invalid token, please Log in first', status: 403 })
        }
    }
}