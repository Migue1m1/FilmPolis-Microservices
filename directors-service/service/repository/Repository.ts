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
                res.json({ message: 'Error during find Director', status: res.status, error: err });
            }
            if (director) {
                res.json({ message: 'Director found successfully', status: res.status, data: director });
            } else {
                res.json({ message: 'Director not found with name: ' + name, status: res.status });
            }
        });
    }

    public getById (req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        let query = { id: id };
        Director.findOne (query, (err, director) => {
            if (err) {
                res.json({ message: 'Error during find Director', status: res.status, error: err });
            }
            if (director) {
                res.json({ message: 'Director found successfully', status: res.status, data: director });
            } else {
                res.json({ message: 'Director not found with id: ' + id, status: res.status });
            }
        });
    }

    public addDirector (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let token = req.body.token || req.query.token || req.headers['x-acces-token'];

        if (token) {
            verify (token, mongoDb.getSecret(), (tokenError: any) => {
                if (tokenError) {
                    return res.json({ message: 'Filed to authenticate token', status: res.status });
                }
                return res.json({ message: 'Director added', status: res.status });
            });
        }
        else {
            return res.json({ message: 'Invalid token, please Log in first', status: res.status })
        }
    }
}