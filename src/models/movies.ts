import { SchemaTypes } from "mongoose";
import ReactionSchema from "./reaction";

const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MovieSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: Number,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    imageURL:{
        type: String,
        required: true,
    },
    actors:[{
        type: String,
        required: true,
        trim: true
    }],
    averageRating:{
        type: Number,
        required: true,
    },
    reactions:[ReactionSchema]
})

export const Movie = model("movie", MovieSchema);