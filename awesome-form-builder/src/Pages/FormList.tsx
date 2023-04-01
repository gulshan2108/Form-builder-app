import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormCard from "../Components/FormCard";
import PreviewCard from "../Components/PreviewCard";
import API from "../Services/Index";
import FormBuilder from "./FormBuilder";
import "./FormBuilder.css";
import { formData } from "../Modules/Interfaces";

const FormList = () => {

    const [formListing, setFormListing] = useState<formData[]>([])
    const [formDetails, setFormDetails] = useState<formData>()
    const [editId, setEditId] = useState<string>()
    const [open, setOpen] = useState<boolean>(false);
    const [previewId, setPreviewId] = useState<string>("")
    const [loading, setLoading]= useState<boolean>(true)

    const handleClose = () => {
        setOpen(false)
        setEditId(null)
        getFormData()
        getPreview(previewId)
    };

    const handleOpen = (id) => {
        setOpen(true)
        setEditId(id)
    };

    const getFormData = async () => {
        try {
            const result = await API.get("/form")
            if (result) {
                setFormListing(result?.data?.forms)
                setLoading(false)
            }
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getPreview = (id) => {
        setPreviewId(id)
        API.get(`/form/${id}`)
            .then((res) => setFormDetails(res?.data?.form))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getFormData()
    }, [])

    return (
        <>
            <FormBuilder handleClose={handleClose} open={open} editId={editId} formDetails={formDetails} />
            <Grid container spacing={2} maxWidth="lg" sx={{ margin: '0 auto' }}>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={() => setOpen(true)} className="add-btn" sx={{ margin: '40px 0 10px' }}>Add Form</Button>
                    <Box className="loader-wrapper">
                    {loading && <CircularProgress />}
                    </Box>
                    {formListing?.map((form, index) => {
                        return <FormCard form={form} index={index} getPreview={getPreview} />
                    })}
                      {(formListing.length === 0 && !loading) ? 
                    <Typography variant="subtitle1">No records found</Typography>: null
                      }
                </Grid>
                <Grid item xs={8} >
                    <Box className="preview-wrapper">
                        <Grid container sx={{ marginBottom: '10px' }}>
                            <Grid item sm={8}>
                                <Typography variant="h5" textAlign="left">Form Preview</Typography>
                            </Grid>
                            <Grid item sm={4} textAlign="right">
                                {formDetails?.form?.length ? <Button variant="contained" onClick={() => handleOpen(formDetails?._id)}>edit</Button> : null}
                            </Grid>
                        </Grid>

                        <Box className="rightCardWrapper">
                            <Card className="formDetialCard">
                                <CardContent>
                                    {formDetails?.form?.map((form) => {
                                        return <PreviewCard form={form} />
                                    })}
                                    <Box textAlign="center">
                                    {formDetails?.form?.length ? <Button variant="contained" disabled>Submit</Button> : null}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default FormList;