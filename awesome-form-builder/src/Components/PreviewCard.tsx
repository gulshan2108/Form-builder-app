import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const PreviewCard = ({ form }) => {
    return (
        <Box>
            {form?.type === "text" && <TextField label={form?.label} fullWidth sx={{ marginBottom: '10px' }} />}
            {form?.type === "text-area" && <TextField label={form?.label} multiline rows={4} fullWidth sx={{ marginBottom: '10px' }} />}
            {form?.type === "select" &&
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{form?.label}</InputLabel>
                    <Select label={form?.label} fullWidth sx={{ marginBottom: '10px' }}>
                        {form?.config?.options?.map((opt) => {
                            return <MenuItem value="select">{opt?.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            }
        </Box>
    )
}

export default PreviewCard;
