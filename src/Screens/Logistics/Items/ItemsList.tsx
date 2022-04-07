import { Box, Button, Card, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Items } from "../../../types/types";
import styles from "../../Home/Home.module.css";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Modal from "./Item/Modal";
import { NewItem } from "./Item/NewItem";
import { ExistingItem } from "./Item/ExistingItem";

type Props = { itemsList: Items[], addItem: () => void };

interface ItemsAvailable extends Items {
  available: number;
};

export const ItemsList = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [child, setChild] = useState(<div></div>);
  const [modalTitle, setModalTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const mergedItemsList: ItemsAvailable[] = [];
  props.itemsList.forEach((items) => {
    const index = mergedItemsList.findIndex((mergedItems) => {
      return mergedItems.name == items.name;
    });
    if (index === -1) {
      const mergedItems: ItemsAvailable = { ...items, available: !items.usedBy ? items.quantity : 0 };
      mergedItemsList.push(mergedItems);
    } else {
      mergedItemsList[index].quantity += items.quantity;
      mergedItemsList[index].available += !items.usedBy ? items.quantity : 0;
    }
  });

  const handleClickOpen = (c: any) => {
    if (c === null) {
      let o = (mergedItemsList[0].owner as unknown);
      setModalTitle("הוספת פריט")
      setChild(<NewItem close={handleClose} owner={o as number}/>)
    } else {
      setModalTitle(c.name)
      setChild(<ExistingItem close={handleClose} item={c} />)
    }
    setOpen(true);
  };

  const itemsBox = mergedItemsList.map((items) =>
  (<Grid item>
    <Card
      sx={{
        borderRadius: '25%',
        height: "100px",
        width: "100px",
        backgroundColor: "#C82626B2",
      }}
    >
      <CardActionArea onClick={() => handleClickOpen(items)}>
        <CardContent>
          <Typography
            align="center"
            sx={{ fontSize: "20px" }}
            style={{ lineHeight: "75%" }}
            color="white"
            gutterBottom
          >
            {items.name}
          </Typography>
          <Typography
            align="center"
            sx={{ fontSize: "12px" }}
            color="white"
            gutterBottom
          >
            זמין: {items.available}
          </Typography>
          <Typography
            align="center"
            sx={{ fontSize: "12px" }}
            color="white"
            gutterBottom
          >
            סה"כ: {items.quantity}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
  </Grid>)
  );

  itemsBox.push(
    <Grid item>
      <Card
        sx={{
          borderRadius: '25%',
          height: "90px",
          width: "90px",
          backgroundColor: "transparent",
        }}
        style={{ border: '5px #C82626B2 solid' }}
      >
        <CardActionArea onClick={() => handleClickOpen(null)}>
          <CardContent>
            <Typography color="#C82626B2" align="center" variant="h2" sx={{ mb: 1.5 }}>
              +
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Paper className={styles.homeContainer}>
      <Grid container
        spacing={3}
        alignItems="center"
        justifyContent={'space-around'}
      >
        {itemsBox}
      </Grid>

      <Modal isOpen={open} handleClose={handleClose} title={modalTitle}>
        {child}
      </Modal>
    </Paper>
  );
};
