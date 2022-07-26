import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Grid,
    FormControl, InputLabel, Select, MenuItem, Autocomplete
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { ItemsService } from '../../../Services/ItemsService';
import { Unit, User } from '../../../types/types';
import { UserService } from '../../../Services/UserService';
import { UnitService } from '../../../Services/UnitService';
import { useAuth } from '../../../Hooks/useAuth';

type propsType = {
    isOpen: boolean,
    handleClose: () => void,
    itemId: number,
    itemName: string,
}


const QUANTITY_TO_BORROW = 'quantityToBorrow';
const DESCRIPTION = 'description';
const PLUGA = 'pluga';
const USER = 'user'

const QUANTITY_TO_BORROW_LABEL = 'כמות להשאלה';
const DESCRIPTION_LABEL = 'פירוט';
const PLUGA_LABEL = 'פלוגה';
const USERS_LABEL = 'צוערים';
const NO_USERS_TEXT = 'אין צוערים';

const schema = yup.object({
    [QUANTITY_TO_BORROW]: yup.number().positive('כמות חייבת להיות גדולה מ0')
        .integer().typeError('מספר חייב להיות בעל ערך').required('כמות חובה'),
    [DESCRIPTION]: yup.string(),
    [PLUGA]: yup.string().required('שדה זה חובה'),
    [USER]: yup.string().required('שדה זה חובה')
});

const BorrowItemDialog = ({ isOpen, handleClose, itemId, itemName }: propsType) => {
    const [plugot, setPlugot] = useState<Unit[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const { control, handleSubmit, formState, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const user = useAuth();
    const userGdudId = user.team.parent.parent.id || null;

    const { errors, isValid } = formState

    const plugaId = watch(PLUGA, null)

    const getPlugot = async () => {
        try {
            if (userGdudId !== null) {
                const plugotList = await UnitService.getCompaniesByGdudId(userGdudId);
                setPlugot(plugotList);
            }
        } catch (e) {
            Swal.fire({ title: 'קרתה שגיאה בשליחת הבקשה', icon: 'error', timer: 3000 });
        }
    }

    const getUsersByPlugaId = async (plugaId: number | null) => {
        try {
            if (plugaId !== null) {
                const usersList = await UserService.getUsersByPlugaId(plugaId);
                setUsers(usersList);
            }

        } catch (e) {
            Swal.fire({ title: 'קרתה שגיאה בשליחת הבקשה', icon: 'error', timer: 3000 });
        }
    }

    useEffect(() => {
        getPlugot()
    }, [userGdudId])

    useEffect(() => {
        getUsersByPlugaId(plugaId)
    }, [plugaId])

    const onSubmit = async (itemToBorrow: any) => {
        await ItemsService.borrowItem({ itemId, ...itemToBorrow })
        handleClose()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
        >
            <DialogTitle>{itemName}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container>
                        <Controller
                            name={QUANTITY_TO_BORROW}
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <TextField
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={Boolean(errors[QUANTITY_TO_BORROW])}
                                    label={errors[QUANTITY_TO_BORROW]?.message || QUANTITY_TO_BORROW_LABEL}
                                    fullWidth
                                    type='number'
                                    margin='normal'
                                    variant='filled'
                                />
                            )}
                        />
                    </Grid>
                    <Grid container>
                        <Controller
                            name={DESCRIPTION}
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={Boolean(errors[DESCRIPTION])}
                                    label={errors[DESCRIPTION]?.message || DESCRIPTION_LABEL}
                                    multiline
                                    rows={5}
                                    fullWidth
                                    margin='normal'
                                    variant='filled'
                                />
                            )}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item container xs={6}>
                            <Controller
                                name={PLUGA}
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>{PLUGA_LABEL}</InputLabel>
                                        <Select
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={Boolean(errors[PLUGA])}
                                            label={errors[PLUGA]?.message || PLUGA_LABEL}
                                        >
                                            {plugot.map((pluga: Unit) => (
                                                <MenuItem value={pluga.id}>{pluga.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item container xs={6}>
                            <Controller
                                name={USER}
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={users}
                                        value={field.value?.id}
                                        onChange={(_, valueToChange) => {
                                            valueToChange && field.onChange(valueToChange?.id)
                                        }}
                                        getOptionLabel={user => `${user?.firstName} ${user?.lastName}`}
                                        noOptionsText={NO_USERS_TEXT}
                                        style={{ width: '100%' }}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label={errors[USER]?.message || USERS_LABEL}
                                                error={Boolean(errors[USER])}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>
                        בטל
                    </Button>
                    <Button disabled={!isValid} type='submit' variant='contained'>
                        אשר
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
};

export default BorrowItemDialog;