import * as mongoose from "mongoose";

interface IDirectorModel extends mongoose.Document{};
var directorSchema = new mongoose.Schema({
    id: String,
    name: String,
    birthDay: String,
    deathDay: String,
    birthPlace: String,
    gender: String,
    biography: String,
    imageURL: String,
    imdbId: String
}, { id: false });

var Director = mongoose.model("Director", directorSchema);

export = Director;