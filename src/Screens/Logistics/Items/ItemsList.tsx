import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useMemo, useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { ItemsService } from "../../../Services/ItemsService";
import { Items } from "../../../types/types";
import { ExistingItem } from "./Item/ExistingItem";
import Modal from "./Item/Modal";
import { NewItem } from "./Item/NewItem";

type Props = {
  itemsList: Items[];
  addItem: (items: Items) => void;
  deleteItem: (itemId: number) => void;
  returnItem: (itemId: number) => void;
};

export const ItemsList = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [chosenItems, setChosenItems] = useState<Items[]>(null!);
  const currentUser = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const getAmountOfItems = (items: Items[]) => {
    let quantity = 0;
    let available = 0;

    items.forEach((item) => {
      quantity += item.quantity;
      if (item.usedBy.id === currentUser.team.parent.id) {
        available += item.quantity;
      }
    });

    return { quantity, available };
  };

  const itemsBox = useMemo(() => {
    const mergedItemsList: Items[][] = [];
    props.itemsList.forEach((items) => {
      const index = mergedItemsList.findIndex((mergedItems) => {
        return mergedItems[0].name == items.name;
      });
      if (index === -1) {
        mergedItemsList.push([items]);
      } else {
        mergedItemsList[index] = [...mergedItemsList[index], items];
      }
    });

    const itemsBox = mergedItemsList.map((items) => {
      const amountOfItems = getAmountOfItems(items);

      return (
        <Grid item key={items[0].name}>
          <Card
            sx={{
              borderRadius: "25%",
              height: "100px",
              width: "100px",
              backgroundColor: "#C82626B2",
            }}
          >
            <CardActionArea
              onClick={() => {
                setChosenItems(items);
                setModalTitle(items[0].name);
                setOpen(true);
              }}
            >
              <CardContent>
                <Typography
                  align="center"
                  sx={{ fontSize: "20px" }}
                  style={{ lineHeight: "75%" }}
                  color="white"
                  gutterBottom
                >
                  {items[0].name}
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontSize: "12px" }}
                  color="white"
                  gutterBottom
                >
                  זמין: {amountOfItems.available}
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontSize: "12px" }}
                  color="white"
                  gutterBottom
                >
                  סה"כ: {amountOfItems.quantity}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });

    itemsBox.push(
      <Grid key="add" item>
        <Card
          sx={{
            borderRadius: "25%",
            height: "90px",
            width: "90px",
            backgroundColor: "transparent",
          }}
          style={{ border: "5px #C82626B2 solid" }}
        >
          <Button
            sx={{ height: "100%", width: "100%" }}
            onClick={() => {
              setChosenItems(null!);
              setOpen(true);
              setModalTitle("הוספת פריט");
            }}
          >
            <Typography color="#C82626B2" align="center" variant="h2">
              +
            </Typography>
          </Button>
        </Card>
      </Grid>
    );
    return itemsBox;
  }, [props.itemsList]);

  const handleCreateItem = async (
    ownerId: number,
    quantity: number,
    name: string
  ) => {
    const createdItem = await ItemsService.createItem(ownerId, quantity, name);
    props.addItem(createdItem!);
    handleClose();
  };

  return (
    <Box>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent={"space-around"}
      >
        {itemsBox}
      </Grid>

      <Modal isOpen={open} handleClose={handleClose} title={modalTitle}>
        {chosenItems ? (
          <ExistingItem
            close={handleClose}
            items={chosenItems}
            deleteItem={props.deleteItem}
            returnItem={props.returnItem}
          />
        ) : (
          <NewItem
            onCreateItem={handleCreateItem}
            close={handleClose}
            owner={currentUser.team.parent.id}
          />
        )}
      </Modal>
    </Box>
  );
};
