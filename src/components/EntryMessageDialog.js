import * as React from 'react';
import { Box, Grid } from '@mui/material'
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
            <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{'Pixel6 React Assingment'}</DialogTitle>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <DialogContentText id="alert-dialog-slide-description">
                    <Box style={{ fontWeight: 'bold' }}>Welcome to My React Assignment!</Box>

                    <Box>Hello there! 🌟</Box>
                    <Grid style={{ width: '100%', textAlign: 'justify' }}>
                        <Box style={{margin: '10px 0px'}}>Thank you for taking the time to review my ReactJS assignment. I’ve created a dynamic and interactive application to showcase my frontend development skills.</Box>

                        <Box style={{margin: '10px 0px'}}>Feel free to explore the features and see how I’ve implemented React concepts in a real-world scenario. If you have any feedback or questions, I’d love to hear from you!</Box>

                        <Box style={{margin: '10px 0px'}}>Enjoy your experience, and thank you again for the opportunity!</Box>
                        <Box style={{fontWeight: 'bold'}}>Best regards,</Box>
                        <Box style={{fontWeight: 'bold'}}>Rushikesh Goli</Box>
                    </Grid>




                </DialogContentText>
                <Button onClick={onClose} className={classes.activeButton}>Click Here To View Application</Button>
            </DialogContent>

        </Dialog>
    );
}

export default EntryMessageDialog