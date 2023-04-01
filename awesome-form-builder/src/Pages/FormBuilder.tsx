import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormMainObj, FormObject } from "../Modules/Interfaces";
import API from "../Services/Index";
import "./FormBuilder.css";

const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: scrollY
};

function FormBuilder({ handleClose, open, editId, formDetails }) {

  const { register, handleSubmit,formState: { errors }, reset} = useForm<FormMainObj>();
  const details = formDetails?.form
  const [form, setForm] = useState<Array<FormObject>>([]);

  useEffect(() => {
    editId ? setForm(details) : setForm([])
    reset()
  }, [editId])

  const handleAddField = () => {
    const newField: FormObject = { type: "", name: "", label: "", required: false, config: { options: [] } };
    setForm([...form, newField]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...form];
    newFields.splice(index, 1);
    setForm(newFields);
  };

  const handleChangeType = (index: number, newType: string) => {
    const newFields = [...form];

    newFields[index].type = newType;
    setForm(newFields);
  };

  const onSubmit= (data: FormMainObj) => {
    const body = {
      ...data,
      form: data?.form?.map((obj, index) => {
        const formObj = form[index];
        return {
          ...obj,
          type: formObj?.type,
        };
      })
    };
    if (editId) {
      body.id = formDetails?._id
    }

    API.post("/form", body)
      .then((res) => {
        if (editId) {
          console.log(res?.data?.success)
        }
        else {
          console.log(res?.data?.message)
        }
        handleClose()
      }
      )
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
          <div>
            <Button variant="contained" color="primary" onClick={handleAddField} sx={{ marginBottom: '10px' }}>
              Add Field
            </Button>
          </div>
          {form?.map((field, index) => (
            <Card className="formDetialCard" key={index}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select defaultValue={field.type} onChange={(e) => handleChangeType(index, e.target.value as string)} fullWidth sx={{ marginBottom: '10px' }}>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="text-area">Text Area</MenuItem>
                  <MenuItem value="select">Select</MenuItem>
                </Select>
              </FormControl>
              {errors?.form?.some(err => err?.type) && <label style={{margin: '0 0 15px', display: 'block'}}>Type field is required</label>}
              <TextField
                label="Name"
                name="name"
                defaultValue={field.name}
                {...register(`form.${index}.name` as any, { required: true})}
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
              {errors?.form?.some(err => err?.name) && <label style={{margin: '0 0 15px', display: 'block'}}>Name field is required</label>}
              <TextField
                label="Label"
                defaultValue={field.label}
                {...register(`form.${index}.label` as any, { required: true})}
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
              {errors?.form?.some(err => err?.label) && <label style={{margin: '0 0 15px', display: 'block'}}>Label field is required</label>}
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={field.required}
                    {...register(`form.${index}.required` as any)}
                  />
                }
                label="Required"
                sx={{ marginBottom: '10px' }}
              />
              {field.type === "select" &&
                (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const newOptions = [...field.config.options, { value: "", label: "" }];
                        const newField = { ...field, config: { ...field.config, options: newOptions } };
                        const newFields = [...form];
                        newFields[index] = newField;
                        setForm(newFields);
                      }}
                      sx={{ marginBottom: '10px' }}
                    >
                      Add Option
                    </Button>
                    {field?.config?.options && field?.config?.options?.map((option: any, optionIndex: number) => (
                      <div key={optionIndex}>
                        <div>
                          <TextField
                            label="Value"
                            defaultValue={option.value}
                            {...register(`form.${index}.config.options.${optionIndex}.value` as any)}
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                          />
                        </div>
                        <div>
                          <TextField
                            label="Label"
                            defaultValue={option.label}
                            {...register(`form.${index}.config.options.${optionIndex}.label` as any)}
                            fullWidth
                            sx={{ marginBottom: '10px' }}
                          />
                        </div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            const newOptions = [...field.config.options];
                            newOptions.splice(optionIndex, 1);
                            const newField = { ...field, config: { ...field.config, options: newOptions } };
                            const newFields = [...form];
                            newFields[index] = newField;
                            setForm(newFields);
                          }}
                          sx={{ marginBottom: '10px' }}
                        >
                          Remove Option
                        </Button>
                      </div>
                    )
                    )}
                  </div>
                )
              }
              <div>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveField(index)}>
                  Remove Field
                </Button>
              </div>
            </Card>
          ))}
          {form?.length ?
            <div className="btn-wrapper">
              <Button variant="contained" color="primary" onClick={handleClose} sx={{ marginRight: '30px' }}>
                cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {editId ? "Save" : "Add"}
              </Button>
            </div> : null
          }
        </form>
      </Box>

    </Modal>
  );
}

export default FormBuilder;
