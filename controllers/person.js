import mongoose from "mongoose";
import { PersonModel } from "../models/person.js";
const getAllPerson = async (req, res) => {
    let { search } = req.query;
    let perPage = req.query.perPage || 5;
    let page = req.query.page || 1;
    let ex = new RegExp(search)
    console.log(search)
    try {
        let filter = {};
        if (search) {
            filter.name = ex;
            console.log(filter)
        }
        let allPersons = await PersonModel.find(filter)
        .skip((page-1)*(perPage))
        .limit(perPage);
        res.json(allPersons);
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}

const getPersonById = async (req, res) => {
    let { personid } = req.params;
    try {
        if (!mongoose.isValidObjectId(personid)) {
            console.log(personid)
            return res.status(400).send("code isnt valid")
        }
        let person = await PersonModel.findById(req.params.personid)
        if (!person)
            return res.status(404).send("not found!")
        res.json(person)
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}

const deletePersonById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("code isnt valid")
        let person = await PersonModel.findByIdAndDelete(id)
        if (!person)
            return res.status(404).send("not found!")
        res.json(person)
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}

const updatePeson = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("code isnt valid")
        let personToUpdate = await PersonModel.findById(id)
        if (!personToUpdate)
            return res.status(404).send("not found!")
        await PersonModel.findByIdAndUpdate(id, req.body);
        let person = await PersonModel.findById(id)
        res.json(person);
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}

const addPerson = async (req, res) => {
    let { name, id, age } = req.body;
    if (!name || !id)
        return res.status(404).send("name or id are absent")
    try {
        let samePerson = await PersonModel.find({ id })
        if (samePerson.length > 0)
            return res.status(409).send("there is person with the same details")
        let newPerson = new PersonModel({ name, id, age })
        await newPerson.save();
        res.json(newPerson);
    }
    catch (err) {
        res.status(400).send("sorry! " + err.messsage)
    }
}
export { getAllPerson, getPersonById, addPerson, updatePeson, deletePersonById };