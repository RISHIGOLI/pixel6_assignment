import { Grid, Box, Dialog, TextField, IconButton, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiDialog-paperWidthSm': {
            /* Add your custom styles for paperWidthSm here */
            maxWidth: '100vw', // Example custom style
            maxHeight: '100vh'
        },
    },
    mainContainer: {
        height: 'fit-content',
        width: '50vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    activeButton: {
        backgroundColor: 'gray !important',
        color: 'white !important',
        margin: '5px !important',
        '&:hover': {
            backgroundColor: 'gray !important',
            color: 'white !important',
        },
        textTransform: 'none !important'
    }
}))

function AddCustomerDialog() {
    const classes = useStyles()
    const [addresses, setAddresses] = useState([1])

    useEffect(() => {
        console.log(addresses);
    }, [addresses])

    function deleteAddressHandler(address) {
        const newAddresses = addresses.filter((addresss) => addresss !== address)
        setAddresses(newAddresses)
    }

    return (
        <>
            <Dialog
                open={true}
                className={classes.dialog}
            >
                <Grid className={classes.mainContainer}>
                    <Grid container spacing={0} margin="0.4rem">

                        {/* title container */}
                        <Grid item xs={12}>
                            <Grid style={{ height: '2rem', margin: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box style={{ fontSize: '20px', fontWeight: 'bold' }}>Add Customer</Box>
                                <Box><IconButton><CloseIcon style={{ fontSize: '30px', cursor: 'pointer' }} /></IconButton></Box>
                            </Grid>
                        </Grid>

                        {/* full name */}
                        <Grid item xs={12}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='Full Name'
                                    name="name"
                                    fullWidth
                                    className={classes.textField}
                                />
                            </Box>
                        </Grid>

                        {/* email */}
                        <Grid item xs={12}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='Email'
                                    name="email"
                                    fullWidth
                                    className={classes.textField}
                                />
                            </Box>
                        </Grid>

                        {/* pan */}
                        <Grid item xs={6}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='PAN No'
                                    name="panNo"
                                    fullWidth
                                    className={classes.textField}
                                />
                            </Box>
                        </Grid>

                        {/* mobile no */}
                        <Grid item xs={6}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='Mobile No'
                                    name="mobileNo"
                                    fullWidth
                                    className={classes.textField}
                                />
                            </Box>
                        </Grid>

                        {/* address */}
                        <Grid item xs={12}>
                            <Grid>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box style={{ margin: '5px', fontWeight: 'bold' }}>Addresses</Box>
                                </Grid>
                                {
                                    addresses.map((address, index) => (
                                        <Grid container spacing={0} border="1px solid lightgray" key={index}>
                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box style={{ margin: '5px' }}>Address {address}</Box>
                                                <Button className={classes.activeButton} onClick={() => deleteAddressHandler(address)}>Delete</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='Address Line 1'
                                                        name="mobileNo"
                                                        fullWidth
                                                        className={classes.textField}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='Address Line 2'
                                                        name="mobileNo"
                                                        fullWidth
                                                        className={classes.textField}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='Post Code'
                                                        name="mobileNo"
                                                        fullWidth
                                                        className={classes.textField}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='City'
                                                        name="mobileNo"
                                                        fullWidth
                                                        className={classes.textField}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='State'
                                                        name="mobileNo"
                                                        fullWidth
                                                        className={classes.textField}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Button className={classes.activeButton} onClick={() => setAddresses((addresses) => ([...addresses, addresses[addresses.length - 1] + 1]))}>Add More</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default AddCustomerDialog