import { Box, Button, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { useAuth } from "../../Hooks/useAuth";
import { ItemsService } from "../../Services/ItemsService";
import { Items } from "../../types/types";
import styles from "../Home/Home.module.css";
import { ItemsList } from "./Items/ItemsList";

type Props = {};

const itemsListMock: Items[] = [
  {
    id: 1,
    name: "אלמניה",
    quantity: 10,
    owner: {
      id: 1,
      name: "פלוגה ד"
    },
    usedBy: {
      id: 1,
      name: "פלוגה ד"
    },
    description: "לשטח",
    startedUseAt: new Date(),
  },
  {
    id: 2,
    name: "אלמניה",
    quantity: 20,
    owner: {
      id: 1,
      name: "פלוגה ד"
    },
    usedBy: null,
    description: "",
    startedUseAt: new Date(),
  },
];

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

  return (
    <Paper className={styles.homeContainer} style={{ overflow: "hidden" }}>
      <PageTitle title="לוגיסטיקה" />
      <ItemsList addItem={() => {}} itemsList={itemsList} />
    </Paper>
  );
};
