
import { useState } from 'react';
import { Paper, Button, Grid } from '@mui/material';
import {Add } from '@mui/icons-material/';
import { PageTitle } from '../../Common/PageTitle/PageTitle';
import { useAuth } from '../../Hooks/useAuth';
import styles from '../Home/Home.module.css';
import { AddItemDialog } from './addItemDialog';
import LogisticTable from './LogisticTable';


export const Logistics = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const user = useAuth();

  return (
    <Paper style={{ overflow: "hidden" }}>
      <PageTitle title="לוגיסטיקה" disableBackButton />
      <Grid container>
        <Button
          endIcon={<Add />}
          onClick={() => setIsAddDialogOpen(true)}
          variant='contained'
          color='primary'
          size='large'
          style={{ marginRight: '16px', marginBottom: '16px' }}>
          יצירה
        </Button>
        <LogisticTable />
        {isAddDialogOpen &&
          <AddItemDialog
            isOpen={isAddDialogOpen}
            handleClose={() => setIsAddDialogOpen(false)}
            ownerId={user.team.parent.id}
          />}
      </Grid>
    </Paper>
  );
};
