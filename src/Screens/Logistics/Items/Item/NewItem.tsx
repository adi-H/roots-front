import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ItemsService } from "../../../../Services/ItemsService";

type Props = { owner: number, close: () => void }

export const NewItem = (props: Props) => {
    const [name, setName] = useState("")
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [amount, setAmount] = useState(0)
    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let d = (event.target.value as unknown)
        setAmount(d as number);
    };

    const [dis, setDis] = useState("")
    const handleChangeDis = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDis(event.target.value);
    };

    async function createItem(owner: number, quantity: number, n: string) {
        await ItemsService.createItem(owner, quantity, n);
        props.close()
    }

    return (
        <Box>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                שם פריט
            </Typography>
            <TextField onChange={handleChangeName} value={name} margin="normal" sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }} label="שם פריט" variant="filled"></TextField>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                כמות
            </Typography>
            <TextField onChange={handleChangeAmount} value={amount} margin="normal" sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }} label="כמות" variant="filled"></TextField>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                פירוט
            </Typography>
            <TextField onChange={handleChangeDis} value={dis} multiline margin="normal" rows={4} sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }} fullWidth label="פירוט" variant="filled"></TextField>

            <Box sx={{ mb: "20px" }}>
                <Button
                    onClick={props.close}
                    style={{
                        backgroundColor: "white",
                        height: "9vh",
                        width: "9vh",
                        borderRadius: "100%", "marginLeft": 9,
                        color: "#C82626B2"
                    }} variant="contained" >בטל</Button>
                <Button
                    onClick={() => createItem(props.owner, amount, name)}
                    style={{
                        backgroundColor: "white",
                        height: "9vh",
                        width: "9vh",
                        borderRadius: "100%", "marginRight": 9,
                        color: "#C82626B2"
                    }}
                    variant="contained" >אשר</Button>
            </Box>
        </Box>
    )
}