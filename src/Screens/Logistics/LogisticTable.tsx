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
import { Delete, Undo } from '@mui/icons-material/';
import Swal from 'sweetalert2';
import { ItemsService } from '../../Services/ItemsService';
import { itemFields } from './addItemDialog'
import { Item } from '../../types/types';

type propsType = {
    itemsList: Item[],
    setItemsList: any,
    handleOpenBorrowDialog: (item: Item) => void
}

type tableRow = { id: string, name: string }

const { NAME, TOTAL_QUANTITY, UNUSABLE_QUANTITY, DESCRIPTION } = itemFields

const tableRows: tableRow[] = [
    { id: NAME, name: 'שם פריט' },
    { id: TOTAL_QUANTITY, name: 'כמות זמינה' },
    { id: UNUSABLE_QUANTITY, name: 'כמות בלאי' },
    { id: DESCRIPTION, name: 'פירוט' }
];

const tableActions = [
    { id: 'deleteIcon', name: '' },
    { id: 'borrowIcon', name: '' }
]

const LogisticTable = ({ itemsList, setItemsList, handleOpenBorrowDialog }: propsType) => {

    const handleDeleteItem = async (itemIdToDelete: number) => {
        try {
            await ItemsService.deleteItem(itemIdToDelete);
            setItemsList((currItemsList: Item[]) => currItemsList.filter(item => item.id !== itemIdToDelete));
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
                            <TableCell key={`${item.id}borrow`} align='center'>
                                <Tooltip title='השאלה'>
                                    <IconButton color='info' onClick={() => handleOpenBorrowDialog(item)}>
                                        <Undo />
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