import { Box, Button, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { useAuth } from "../../Hooks/useAuth";
import { ItemsService } from "../../Services/ItemsService";
import { Items } from "../../types/types";
import { ItemsList } from "./Items/ItemsList";

type Props = {};

export const Logistics = (props: Props) => {
  const [itemsList, setItemsList] = useState<Items[]>([]);
  const user = useAuth();

  useEffect(() => {
    getItemsList(user.team.parent.id);
  }, []);

  async function getItemsList(ownerId: number) {
    const itemsList = await ItemsService.getItemsList(ownerId);
    setItemsList(itemsList);
  }

  const handleDeleteItem = (itemId: number) => {
    setItemsList((currItemsList) => {
      return currItemsList.filter((item) => item.id !== itemId);
    });
  };

  const handleReturnItem = (itemId: number) => {
    setItemsList((currItemsList) => {
      return currItemsList.map((item) =>
        item.id !== itemId ? item : { ...item, usedBy: { ...item.owner } }
      );
    });
  };

  return (
    <Paper style={{ overflow: "hidden" }}>
      <PageTitle title="לוגיסטיקה" />
      <ItemsList
        addItem={(items: Items) => {
          setItemsList((currItemsList) => [...currItemsList, items]);
        }}
        itemsList={itemsList}
        deleteItem={handleDeleteItem}
        returnItem={handleReturnItem}
      />
    </Paper>
  );
};
