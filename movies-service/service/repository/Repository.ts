import { Request, Response, NextFunction } from 'express';
import * as Movie                          from '../models/Movie';
import { verify }                          from 'jsonwebtoken';
import { MongoDbConnection }               from '../dbconnection/MongoDbConnection';
import { ActorService }                    from '../services/ActorService';
import { DirectorService }                 from '../services/DirectorService';

let mongoDb = new MongoDbConnection();
mongoDb.connect();

export class Repository {

    public getSuggestions  (req: Request, res: Response, next: NextFunction) {
        let text = req.params.text;
        let query = { title: new RegExp('^' + text, 'i') };
        Movie.find(query, { _id: 0, title: 1, imageURL: 1 }).limit(10).exec((err, suggestions) => {
            if (err) {
                return res.status(400).json({ message: 'Error during find Movie', status: 400, error: err });
            }
            if (suggestions && suggestions != []) {
                res.status(200).json({ message: 'Movie found successfully', status: 200, data: suggestions });
            }
            else
                res.status(404).json({ message: 'Movie not found', status: 404 });
        });
    }

    public getByTitle (req: Request, res: Response, next: NextFunction) {
        let title = req.params.title;
        let query = { title: title };
        Movie.findOne(query, (err, movie) => {
            if (err) {
                return res.status(400).json({ message: 'Error during find Movie', status: 400, error: err });
            }
            if (movie) {
                let directorService = new DirectorService();
                directorService.getDirectors(movie.get('directors')).then((directors: any[]) => {
                    let actorService = new ActorService();
                    actorService.getActors(movie.get('actors')).then((actors: any[]) => {
                        let data = {
                            title: movie.get('title'),
                            imdbId: movie.get('imdbId'),
                            released: movie.get('released'),
                            rated: movie.get('rated'),
                            studio: movie.get('studio'),
                            description: movie.get('description'),
                            genre: movie.get('genre'),
                            language: movie.get('language'),
                            runtime: movie.get('runtime'),
                            imageURL: movie.get('imageURL'),
                            imdbRating: movie.get('imdbRating'),
                            directors: directors,
                            actors: actors
                        };
                        res.status(200).json({ message: 'Movie found successfully', status: 200, data: data });
                    
                    });
                });
            } else {
                res.status(404).json({ message: 'Movie not found with title: ' + title, status: 404 });
            }
        });
    }

    public getByImdbId (req: Request, res: Response, next: NextFunction) {
        let imdbId = req.params.imdbId;
        let query = { imdbId: imdbId };
        Movie.findOne (query, (err, movie) => {
            if (err) {
                return res.status(400).json({ message: 'Error during find Movie', status: 400, error: err });
            }
            if (movie) {
                res.status(200).json({ message: 'Movie found successfully', status: 200, data: movie });
            } else {
                res.status(404).json({ message: 'Movie not found with imdbId: ' + imdbId, status: 404 });
            }
        });
    }

    public addMovie (req: Request, res: Response, next: NextFunction) {
        let body = req.body;
        let token = req.body.token || req.query.token || req.headers['x-acces-token'];

        if (token) {
            verify (token, mongoDb.getSecret(), (tokenError: any) => {
                if (tokenError) {
                    return res.status(403).json({ message: 'Filed to authenticate token', status: 403 });
                }
                return res.status(201).json({ message: 'Movie added', status: 201 });
            });
        }
        else {
            return res.status(403).json({ message: 'Invalid token, please Log in first', status: 403 })
        }
    }
}