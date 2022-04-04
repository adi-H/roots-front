import KeyIcon from "@mui/icons-material/Key";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SchoolIcon from "@mui/icons-material/School";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROOTS_LOGO from "../../Images/rootsLogo.png";
import styles from "./Home.module.css";
import { BackButton } from "../../Common/PageTitle/BackButton";


type Props = {};

export const Matzal = (props: Props) => {
    return (
        <Paper className={styles.homeContainer}>
            <br></br>
            <Box sx={{
                ml: -3,
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%', maxWidth: 500,
            }}>
                <div></div>
                <Typography variant="h5" gutterBottom component="div">
                    מצ"ל לחייל
                </Typography>
                <BackButton></BackButton>
                
            </Box>
            <br></br>
            <p>מצ"ל: 59</p>
            <p>מצ"ן: 58</p>
            <p>חסרים: 1</p>
        </Paper>
    );
};