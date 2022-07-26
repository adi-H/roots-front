import React, { useEffect, useState } from 'react';
import {
    Dialog, 
    DialogTitle,
    DialogContent,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'
import { ItemsService } from '../../../Services/ItemsService';
import { useAuth } from '../../../Hooks/useAuth';
import { ItemToBorrow } from '../../../types/types';

type propsType = {
    isOpen: boolean,
    handleClose: () => void,
}

type tableRow = { id: string, name: string }

const NAME = 'name';
const BORROWD_DATE = 'borrowdDate';
const RETURN_DATE = 'returnDate';
const STATUS = 'status'

const tableRows = [
    { id: NAME, name: 'שם פריט' },
    { id: BORROWD_DATE, name: 'תאריך השאלה' },
    { id: RETURN_DATE, name: 'תאריך החזרה' },
    { id: STATUS, name: 'סטטוס' }
]

const BorrowdItemsDialog = ({ isOpen, handleClose }: propsType) => {
    const [borrowedItems, setBorrowedItems] = useState<ItemToBorrow[]>([]);

    const user = useAuth();
    const ownerId = user.role.id;

    useEffect(() => {
        const getBorrowedItems = async () => {
            const borrowedItems = await ItemsService.getBorrowedItems(ownerId, null)
            setBorrowedItems(borrowedItems);
        }

        getBorrowedItems();
    }, [ownerId])


    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>היסטוריית השאלות</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {tableRows.map((row: tableRow) => (
                                    <TableCell key={row.id} align='center'>{row.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {borrowedItems.map((item: any) => (
                                <TableRow key={item.id}>
                                    {tableRows.map((row: tableRow) => (
                                        <TableCell key={`${item.id}${row.id}`} align='center'>
                                            {item[row.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog >
    )
};

export default BorrowdItemsDialog;