import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { ItemsService } from '../../../Services/ItemsService';
import itemFields from './itemFields'
import { Item } from '../../../types/types';

type propsType = {
    isOpen: boolean,
    ownerId: number,
    handleClose: () => void
}

const { NAME, READY_TO_USE_QUANTITY, UNUSABLE_QUANTITY, DESCRIPTION } = itemFields;

const NAME_LABEL = 'שם פריט';
const NORMAL_QUANTITY_LABEL = 'כמות זמינה';
const UNORMAL_QUANTITY_LABEL = 'כמות בלאי';
const DESCRIPTION_LABEL = 'תיאור';

const schema = yup.object({
    [NAME]: yup.string().required('שם פריט חובה'),
    [READY_TO_USE_QUANTITY]: yup.number().positive('כמות חייבת להיות גדולה מ0')
        .integer().typeError('מספר חייב להיות בעל ערך').required('כמות חובה'),
    [UNUSABLE_QUANTITY]: yup.number().min(0, 'כמות חייבת להיות גדולה או שווה ל0').integer()
        .typeError('מספר חייב להיות בעל ערך').required('כמות בלאי חובה. במידה ואין השאירו 0'),
    [DESCRIPTION]: yup.string()
});

const AddItemDialog = ({ isOpen, ownerId, handleClose }: propsType) => {
    const { control, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const { errors, isValid } = formState

    const onSubmit = async (itemToCreate: any) => {
        try {
            await ItemsService.createItem(itemToCreate)
            handleClose()
            Swal.fire({ title: 'פריט נוצר בהצלחה', icon: 'success', timer: 3000 });
        } catch (error) {
            Swal.fire({
                title: 'קרתה שגיאה בשליחת הבקשה', icon: 'error', timer: 3000
            });
    }
}

return (
    <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
    >
        <DialogTitle>יצירת פריט</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Grid container>
                    <Controller
                        name={NAME}
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                error={Boolean(errors[NAME])}
                                label={errors[NAME]?.message || NAME_LABEL}
                                fullWidth
                                margin='normal'
                                variant='filled'
                            />
                        )}
                    />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Controller
                            name={READY_TO_USE_QUANTITY}
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <TextField
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={Boolean(errors[READY_TO_USE_QUANTITY])}
                                    label={errors[READY_TO_USE_QUANTITY]?.message || NORMAL_QUANTITY_LABEL}
                                    fullWidth
                                    type='number'
                                    margin='normal'
                                    variant='filled'
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name={UNUSABLE_QUANTITY}
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <TextField
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={Boolean(errors[UNUSABLE_QUANTITY])}
                                    label={errors[UNUSABLE_QUANTITY]?.message || UNORMAL_QUANTITY_LABEL}
                                    fullWidth
                                    type='number'
                                    margin='normal'
                                    variant='filled'
                                />
                            )}
                        />
                    </Grid>
                </Grid>
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

export default AddItemDialog;