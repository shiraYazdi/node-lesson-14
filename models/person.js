import mongoose from "mongoose";
const personSchema = mongoose.Schema({
    name: String,
    id: String,
    age: Number
})



export const PersonModel = mongoose.model("persons", personSchema)