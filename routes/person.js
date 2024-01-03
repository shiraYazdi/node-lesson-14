import express from "express"
import * as personController from "../controllers/person.js"
const router = express.Router();
router.get("/", personController.getAllPerson)
router.get("/:personid", personController.getPersonById)
router.delete("/:id", personController.deletePersonById)
router.post("/", personController.addPerson)
router.put("/:id", personController.updatePeson)

export default router;