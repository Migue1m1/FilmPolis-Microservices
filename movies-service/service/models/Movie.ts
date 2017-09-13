import * as mongoose from "mongoose";

interface IMovieModel extends mongoose.Document{};
var movieSchema = new mongoose.Schema({
    title:       String,
    imdbId:      String,
    released:    String,
    rated:       String,
    studio:      String,
    description: String,
    genre:       String,
    imageURL:    String,
    language:    String,
    runtime:     String,
    imdbRating:  String,
    actors:     [{ id: String, role: String }],
    directors:  [{ id: String }]
}, { id: false });

var Movie = mongoose.model("Movie", movieSchema);

export = Movie;