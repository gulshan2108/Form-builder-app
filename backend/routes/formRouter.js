import express from "express"
import formController from "../controllers/formController.js"

const formRouter = express.Router()

formRouter.post('/form',formController.create)

formRouter.get('/form',formController.fetchAll)

formRouter.get('/form/:id',formController.fetch)



export default formRouter