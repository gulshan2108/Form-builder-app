import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

const FormCard = ({ form, index, getPreview }) => {

    return (
        <Card className="formDetialCard">
            <CardContent>
                <Typography variant="h4">Form {index + 1}</Typography>
                <Typography variant="body1">Created At {form?.createdAt}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={() => getPreview(form?._id)}>preview</Button>
            </CardActions>
        </Card>
    )
}

export default FormCard;