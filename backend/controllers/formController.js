import express from "express"
import Form from "../models/formModel.js"

const formController = express.Router()

const create = async (req, res) => {
   
    try {
        const { id, form } = req.body;
    
        if (id) {
          const updatedForm = await Form.findByIdAndUpdate(
            id,
            { form },
            { new: true }
          );
          if (!updatedForm) {
            return res.status(404).send({ message: 'Form not found' });
          }
          return res.status(200).send({ success: 'Form updated', form: updatedForm });
        }
    
        const newForm = new Form({ form });
        await newForm.save();
        res.status(200).json({ message: 'Form created successfully', data: newForm });
      } catch (error) {
        res.status(400).json({ message: 'Failed to create form', error: error.message });
      }
  };


  const fetchAll = async (req,res) =>{

    try {
        const form = await Form.find({})

        if(form.length === 0) {
            res.status(404).send({message: "form not found"})
        }
        else {
            res.status(200).send({forms:form})
        }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  const fetch = async (req,res) =>{

    try {
        const id = req.params.id

        const form = await Form.findById(id)

        if(form == null) {
            res.status(404).send({form:"form not found"})
        }
        else {
            res.status(200).send({form:form})
        }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
  

export default {
    formController,
    create,
    fetchAll,
    fetch
}