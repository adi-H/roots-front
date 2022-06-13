import { useState, useEffect } from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip
} from '@mui/material';
import { Delete } from '@mui/icons-material/';
import Swal from 'sweetalert2';
import { ItemsService } from '../../Services/ItemsService';
import { itemFields } from './addItemDialog'
import { Items } from '../../types/types';
import { useAuth } from '../../Hooks/useAuth';

type tableRow = { id: string, name: string }

const { NAME, NORMAL_QUANTITY, UNORMAL_QUANTITY, DESCRIPTION } = itemFields

const tableRows: tableRow[] = [
    { id: NAME, name: 'שם פריט' },
    { id: NORMAL_QUANTITY, name: 'כמות תקינה' },
    { id: UNORMAL_QUANTITY, name: 'כמות בלאי' },
    { id: DESCRIPTION, name: 'פירוט' },
];

const tableActions = [
    { id: 'deleteIcon', name: '' }
]

const LogisticTable = () => {
    const [itemsList, setItemsList] = useState<Items[]>([]);

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

    const handleDeleteItem = async (itemId: number) => {
        try {
          await ItemsService.deleteItem(itemId);
          setItemsList(currItemsList => currItemsList.filter(item => item.id !== itemId));
        } catch (e) {
          Swal.fire({ title: 'קרתה שגיאה בשליחת הבקשה', icon: 'error', timer: 3000 });
        }
      };

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {[...tableRows, ...tableActions].map((row: tableRow) => (
                            <TableCell key={row.id} align='center'>{row.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemsList.map((item: any) => (
                        <TableRow key={item.id}>
                            {tableRows.map((row: tableRow) => (
                                <TableCell key={`${item.id}${row.id}`} align='center'>
                                    {item[row.id]}
                                </TableCell>
                            ))}
                            <TableCell key={`${item.id}delete`} align='center'>
                                <Tooltip title='מחיקה'>
                                    <IconButton color='error' onClick={() => handleDeleteItem(item.id)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default LogisticTable;