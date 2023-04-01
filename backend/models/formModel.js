import mongoose from "mongoose";

const formSchema = new mongoose.Schema({

    form: [{

        name : {
            type : String
        },
        label : {
            type : String
        },
    required : {
        type : Boolean
    },
    type : {
        type: String,
        enum: ['text','textarea','select']
    },
    config: {
        options: [{
          value: {
              type: String,
          },
          label: {
              type: String,
            }
        }]
    }
}]

})

formSchema.set('timestamps',true)

const Form = mongoose.model('formTemplateMarket',formSchema)

export default Form