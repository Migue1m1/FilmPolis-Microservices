import { Request, Response, NextFunction } from 'express';
import * as Movie                          from '../models/Movie';
import { verify }                          from 'jsonwebtoken';
import { MongoDbConnection }               from '../dbconnection/MongoDbConnection';

let mongoDb = new MongoDbConnection();
mongoDb.connect();

export class Repository {

    public getByTitle (req: Request, res: Response, next: NextFunction) {
        let title = req.params.title;
        let query = { title: title };
        Movie.findOne(query, (err, movie) => {
            if (err) {
                res.json({ message: 'Error during find Movie', status: res.status, error: err });
            }
            if (movie) {
                res.json({ message: 'Movie found successfully', status: res.status, data: movie });
            } else {
                res.json({ message: 'Movie not found with title: ' + title, status: res.status });
            }
        });
    }

    public getByImdbId (req: Request, res: Response, next: NextFunction) {
        let imdbId = req.params.imdbId;
        let query = { imdbId: imdbId };
        Movie.findOne (query, (err, movie) => {
            if (err) {
                res.json({ message: 'Error during find Movie', status: res.status, error: err });
            }
            if (movie) {
                res.json({ message: 'Movie found successfully', status: res.status, data: movie });
            } else {
                res.json({ message: 'Movie not found with imdbId: ' + imdbId, status: res.status });
            }
        });
    }

    public addMovie (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let token = req.body.token || req.query.token || req.headers['x-acces-token'];

        if (token) {
            verify (token, mongoDb.getSecret(), (tokenError: any) => {
                if (tokenError) {
                    return res.json({ message: 'Filed to authenticate token', status: res.status });
                }
                return res.json({ message: 'Movie added', status: res.status });
            });
        }
        else {
            return res.json({ message: 'Invalid token, please Log in first', status: res.status })
        }
    }
}