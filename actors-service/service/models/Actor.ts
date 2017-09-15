import * as mongoose from "mongoose";

interface IActorModel extends mongoose.Document{};
var actorSchema = new mongoose.Schema({
    id:         String,
    name:       String,
    birthDay:   String,
    deathDay:   String,
    birthPlace: String,
    gender:     String,
    biography:  String,
    imageURL:   String,
    imdbId:     String
}, { id: false });

var Actor = mongoose.model("Actor", actorSchema);

export = Actor;