import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    activeButton: {
        backgroundColor: 'gray !important',
        color: 'white !important',
        margin: 'auto !important',
        '&:hover': {
            backgroundColor: 'gray !important',
            color: 'white !important',
        },
        textTransform: 'none !important'
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export function EntryMessageDialog({ open, onClose }) {
    const classes = useStyles()
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle style={{display: 'flex', justifyContent: 'center'}}>{'Pixel6 React Assingment'}</DialogTitle>
            <DialogContent style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <DialogContentText id="alert-dialog-slide-description">
                    This is developed to show case my skills related to frontend or espacially in reactjs
                </DialogContentText>
                <Button onClick={onClose} className={classes.activeButton}>Click Here To View Application</Button>
            </DialogContent>

        </Dialog>
    );
}

export default EntryMessageDialog