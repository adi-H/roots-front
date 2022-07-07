
import { useEffect, useState } from 'react';
import { Paper, Button, Grid } from '@mui/material';
import { Add } from '@mui/icons-material/';
import Swal from 'sweetalert2';
import { PageTitle } from '../../Common/PageTitle/PageTitle';
import { useAuth } from '../../Hooks/useAuth';
import LogisticTable from './LogisticTable';
import { AddItemDialog } from './addItemDialog';
import BorrowItemDialog from './borrowItemDialog';
import { Item } from '../../types/types';
import { ItemsService } from '../../Services/ItemsService';


export const Logistics = () => {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const user = useAuth();

  useEffect(() => {
    getItemsList(user.team.parent.id);
  }, [user.team.parent.id]);

  async function getItemsList(ownerId: number) {
    try {
      const itemsList = await ItemsService.getItemsList(ownerId);
      setItemsList(itemsList);
    } catch (e) {
      Swal.fire({ title: 'קרתה שגיאה בשליחת הבקשה', icon: 'error', timer: 3000 });
    }
  }

  const handleCloseAddItemDialog = () => {
    setIsAddDialogOpen(false)
  }

  const handleCloseBorrowItemDialog = () => {
    setCurrentItem(null)
  }

  const handleOpenBorrowDialog = (item: Item) => {
    setCurrentItem(item);
  }

  const handleAddItem = (itemToCreate: Item) => {
    setItemsList([...itemsList, itemToCreate])
    handleCloseAddItemDialog();
  }

  return (
    <Paper style={{ overflow: "hidden" }}>
      <PageTitle title="לוגיסטיקה" disableBackButton />
      <Grid container style={{ paddingTop: '16px' }}>
        <Button
          endIcon={<Add />}
          onClick={() => setIsAddDialogOpen(true)}
          variant='contained'
          color='primary'
          size='large'
          style={{ marginRight: '16px', marginBottom: '16px' }}>
          יצירה
        </Button>
        <LogisticTable
          itemsList={itemsList}
          setItemsList={setItemsList}
          handleOpenBorrowDialog={handleOpenBorrowDialog}
        />
        {isAddDialogOpen &&
          <AddItemDialog
            isOpen={isAddDialogOpen}
            handleAddItem={handleAddItem}
            handleClose={handleCloseAddItemDialog}
            ownerId={user.team.parent.id}
          />}
        {currentItem !== null &&
          <BorrowItemDialog
            isOpen={currentItem !== null}
            itemId={currentItem.id}
            itemName={currentItem.name}
            handleClose={handleCloseBorrowItemDialog}
          />}
      </Grid>
    </Paper>
  );
};
