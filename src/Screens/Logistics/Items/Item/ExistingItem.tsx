import { Box, Button, TextField, Typography } from "@mui/material";
import { Items } from "../../../../types/types";
import { useState } from "react";
import { ItemsService } from "../../../../Services/ItemsService";
import * as React from 'react';

interface ItemsAvailable extends Items {
    available: number;
};

type Props = { item: ItemsAvailable, close: () => void };

export const ExistingItem = (props: Props) => {
    let item = props.item;

    const [toPass, setToPass] = useState(false);
    const [amount, setAmount] = useState(0)
    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        let d = (event.target.value as unknown)
        setAmount(d as number);
    };

    const [dis, setDis] = useState("")
    const handleChangeDis = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDis(event.target.value);
    };

    async function passItems(itemId: number, usedBy: any, quantity: number, description: string) {
        await ItemsService.usingItemes(itemId, usedBy, quantity, description);
        props.close()
    }

    async function returnItems(itemId: number) {
        await ItemsService.deleteUsage(itemId);
        props.close()
    }

    const p = () => setToPass(!toPass);

    const main = (
        <Box>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                סה"כ: {item.quantity}
            </Typography>
            <br></br>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                זמין: {item.available}
            </Typography>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                {item.description}
            </Typography>
            <br></br>
            <Box sx={{ mb: "20px" }}>
                <Button
                    onClick={p}
                    style={{
                        backgroundColor: "white",
                        height: "9vh",
                        width: "9vh",
                        borderRadius: "100%", "marginLeft": 9,
                        color: "#C82626B2"
                    }} variant="contained" >העבר</Button>
                <Button
                onClick={() => returnItems(item.id)}
                    style={{
                        backgroundColor: "white",
                        height: "9vh",
                        width: "9vh",
                        borderRadius: "100%", "marginRight": 9,
                        color: "#C82626B2"
                    }}
                    variant="contained" >החזר אלי</Button>
            </Box>
        </Box>
    )

    const pass = (
        <Box>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                כמות
            </Typography>
            <TextField onChange={handleChangeAmount} value={amount} margin="normal" sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }} label="כמות" variant="filled"></TextField>
            <br></br>
            <Typography
                style={{ marginBottom: "-5%", color: "white" }}
                fontWeight={"bold"}
                variant="h5">
                פירוט
            </Typography>
            <TextField onChange={handleChangeDis} value={dis} multiline margin="normal" rows={4} sx={{ backgroundColor: "#FFFFFF", borderRadius: "5px" }} fullWidth label="פירוט" variant="filled"></TextField>
            <Box sx={{ mb: "20px" }}>
                <Button
                    onClick={p}
                    style={{
                        backgroundColor: "white",
                        height: "9vh",
                        width: "9vh",
                        borderRadius: "100%", "marginLeft": 9,
                        color: "#C82626B2"
                    }} variant="contained" >בטל</Button>
                <Button
                    onClick={() => passItems(item.id, 3, amount, dis)}
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

    return !toPass ? main : pass;
}