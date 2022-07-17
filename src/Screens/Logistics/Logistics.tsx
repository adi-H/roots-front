
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

type addDialogStateType = {
  isOpen: boolean,
  currentItem: any | null
}

export const Logistics = () => {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [addDialogState, setAddDialogState] = useState<addDialogStateType>({
    isOpen: false,
    currentItem: null
  })
  const [currentItemToBorrow, setCurrentItemToBorrow] = useState<Item | null>(null);

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

  const handleOpenAddItemDialog = () => {
    setAddDialogState({ isOpen: true, currentItem: null })
  }

  const handleCloseAddItemDialog = () => {
    setAddDialogState({ isOpen: false, currentItem: null })
  }

  const handleOpenEditDialog = (itemToEdit: Item) => {
    setAddDialogState({ isOpen: true, currentItem: itemToEdit })
  }

  const handleOpenBorrowDialog = (item: Item) => {
    setCurrentItemToBorrow(item);
  }

  const handleCloseBorrowItemDialog = () => {
    getItemsList(user.team.parent.id);
    setCurrentItemToBorrow(null)
  }

  const handleAddItem = (itemToCreate: Item) => {
    setItemsList([...itemsList, { ...itemToCreate, borrowedByMe: [] }])
    handleCloseAddItemDialog();
  }

  const handleEditItem = (itemToEdit: Item) => {
    const items = itemsList.map(item => item.id === itemToEdit.id ? itemToEdit : item)
    setItemsList(items)
    handleCloseAddItemDialog();
  }

  const handleDeleteItem = (itemIdToDelete: number) => {
    Swal.fire({
      title: 'האם אתה בטוח שאתה רוצה למחוק מוצר זה?',
      showCancelButton: true,
      cancelButtonText: 'בטל',
      confirmButtonText: 'כן, מחק!'
    }).then(result => {
      if (result.isConfirmed) {
        setItemsList((currItemsList: Item[]) => currItemsList.filter(item => item.id !== itemIdToDelete));
      }
    })
  };

  return (
    <Paper style={{ overflow: "hidden" }}>
      <PageTitle title="לוגיסטיקה" disableBackButton />
      <Grid container style={{ paddingTop: '16px' }}>
        <Button
          endIcon={<Add />}
          onClick={handleOpenAddItemDialog}
          variant='contained'
          color='primary'
          size='large'
          style={{ marginRight: '16px', marginBottom: '16px' }}>
          יצירה
        </Button>
        <LogisticTable
          itemsList={itemsList}
          handleOpenEditDialog={handleOpenEditDialog}
          handleOpenBorrowDialog={handleOpenBorrowDialog}
          handleDeleteItem={handleDeleteItem}
        />
        {addDialogState.isOpen &&
          <AddItemDialog
            isOpen={addDialogState.isOpen}
            item={addDialogState.currentItem}
            handleAddItem={handleAddItem}
            handleEditItem={handleEditItem}
            handleClose={handleCloseAddItemDialog}
            ownerId={user.team.parent.id}
          />}
        {currentItemToBorrow !== null &&
          <BorrowItemDialog
            isOpen={currentItemToBorrow !== null}
            itemId={currentItemToBorrow.id}
            itemName={currentItemToBorrow.name}
            handleClose={handleCloseBorrowItemDialog}
          />}
      </Grid>
    </Paper>
  );
};
