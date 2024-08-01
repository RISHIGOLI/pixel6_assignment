import axios from 'axios'
import { Grid, Box, Dialog, TextField, IconButton, Button, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, editCustomer } from '../store/logic/customers/CustomerSlice'
import { resetPanDataInitialState, verifyPan } from '../store/logic/pan/PanSlice'
import { instance } from '../services/axios-config'
import Pixel6CircularProgress from '../utils/Pixel6CircularProgress'
import ErrorIcon from '@mui/icons-material/Error';
import { getPostCodeDetails, resetPostCodeInitialState } from '../store/logic/postcode/PostCodeSlice';

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
            maxHeight: '90vh',
            height: '90vh',
            overflow: 'hidden'
        },
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
    },
    textField: {
        '& .MuiFormLabel-root, & .MuiInputLabel-root': {
            marginTop: '0px',
            '&:focus': {
                color: 'gray'
            }
        },

        '& .MuiFormControl-root, & .MuiTextField-root': {
            marginLeft: '0px',
        },


        '& .MuiFormLabel-root, & .MuiInputLabel-root.Mui-focused': {
            color: 'gray'
        },

        '& .MuiOutlinedInput-root': {
            paddingRight: '0px',
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(127, 12, 134)', // Change this color to the desired outline color
                borderWidth: '1px'
            }
        },
    },
    errorMessage: {
        fontSize: '0.75rem',
        fontWeight: '400',
        lineHeight: '1.43em',
        letterSpacing: '0.0250em',
        color: '#d32f2f'
    },
    errorIcon: {
        color: '#d32f2f'
    }
}))

function AddCustomerDialog({ open, onClose, editCustomerDetails, customerIndex }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { customers } = useSelector((state) => state.customers)
    const { status, statusCode, message, fullName, panNumber, isValid } = useSelector((state) => state.panData)
    const { status: postCodeStatus, statusCode: postCodeStatusCode, city, state, message: postCodeMessage } = useSelector((state) => state.postCodeData)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
    const [body, setBody] = useState(
        {
            customerName: '',
            customerEmail: '',
            panNumber: '',
            mobileNo: '',
            addresses: [
                {
                    addressLine1: '',
                    addressLine2: '',
                    postCode: '',
                    city: '',
                    state: ''
                }
            ]
        }
    )

    function addMoreAddressesHandler() {
        if (body.addresses.length < 10) {
            setBody({
                ...body,
                addresses: [
                    ...body.addresses,
                    {
                        addressLine1: '',
                        addressLine2: '',
                        postCode: '',
                        city: '',
                        state: ''
                    }
                ]
            })
        }
    }

    function inputHandler(e) {
        console.log('name:', e.target.name, ' value:', e.target.value);
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    function handleAddressChange(e, index) {
        setSelectedAddressIndex(index)
        setBody((body) => {
            const updatedAddresses = [...body.addresses]
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [e.target.name]: e.target.value
            }
            return {
                ...body,
                addresses: updatedAddresses
            }

        })
    }

    function handlePostCodeChange(e, index) {
        setSelectedAddressIndex(index)
        dispatch(getPostCodeDetails({ postcode: e.target.value }))
        setBody((body) => {
            const updatedAddresses = [...body.addresses]
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [e.target.name]: e.target.value
            }
            return {
                ...body,
                addresses: updatedAddresses
            }

        })
    }

    function deleteAddressHandler(addressIndex) {
        if (body.addresses.length > 1) {
            const updatedAddresses = body.addresses.filter((address, index) => index !== addressIndex)
            setBody({
                ...body,
                addresses: updatedAddresses
            })
        }
    }

    function addCustomerHandler() {
        if (editCustomerDetails) {
            dispatch(editCustomer({ customerIndex, customer: body }))
        } else {
            dispatch(addCustomer(body))
        }
    }

    function panInputHandler(e) {
        console.log('value:', e.target.value);
        dispatch(verifyPan({ body: e.target.value }))
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })

    }

    useEffect(() => {
        if (editCustomerDetails === true && customerIndex !== null) {
            console.log("editable form true");
            setBody(customers[customerIndex])
        }

        return () => {
            dispatch(resetPostCodeInitialState())
            dispatch(resetPanDataInitialState())
        }
    }, [])

    useEffect(() => {
        console.log('full name assignment block');
        if (status === 'Success' && fullName.length > 1 ) {
            setBody((body) => ({ ...body, customerName: fullName }))
        } else {
            setBody((body) => ({ ...body, customerName: body.customerName }))
        }
    }, [fullName])

    useEffect(() => {

        setBody((body) => {
            const updatedAddresses = [...body.addresses]
            updatedAddresses[selectedAddressIndex] = {
                ...updatedAddresses[selectedAddressIndex],
                city: city[0]?.name,
                state: state[0]?.name
            }
            return {
                ...body,
                addresses: updatedAddresses
            }

        })
    }, [city, state, postCodeStatus])

    return (
        <>
            <Dialog
                open={open}
                className={classes.dialog}
            >
                <Grid style={{ height: '98vh', maxHeight: '100vh', width: '50vw', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {/* title container */}
                    <Grid style={{ backgroundColor: 'white', height: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 5px', width: '100%', position: 'absolute', top: 0, borderBottom: '1px solid lightgray' }}>
                        <Box style={{ fontSize: '20px', fontWeight: 'bold' }}>Add Customer</Box>
                        <Box onClick={onClose}><IconButton><CloseIcon style={{ fontSize: '30px', cursor: 'pointer' }} /></IconButton></Box>
                    </Grid>
                    <Grid style={{ height: 'calc(100% - 3rem)', width: '100%', backgroundColor: 'white', overflowY: 'auto', position: 'absolute', top: '3rem' }} container spacing={0}>
                        {/* full name */}
                        <Grid item xs={12}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='Full Name'
                                    name="customerName"
                                    value={body?.customerName}
                                    fullWidth
                                    className={classes.textField}
                                    onChange={inputHandler}
                                />
                            </Box>
                        </Grid>

                        {/* email */}
                        <Grid item xs={12}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='Email'
                                    name="customerEmail"
                                    value={body?.customerEmail}
                                    fullWidth
                                    className={classes.textField}
                                    onChange={inputHandler}
                                />
                            </Box>
                        </Grid>

                        {/* pan */}
                        <Grid item xs={6}>
                            <Box style={{ margin: '5px' }}>
                                <TextField
                                    variant="outlined"
                                    label='PAN No'
                                    name="panNumber"
                                    value={body?.panNumber}
                                    fullWidth
                                    className={classes.textField}
                                    onChange={panInputHandler}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                className={classes.clearButton}
                                                onClick={() => setBody({ ...body, panNumber: '' })}
                                            >
                                                {
                                                    status === 'Pending' ? <Pixel6CircularProgress /> : status === 'Success' ? <CheckIcon style={{ fontSize: '30px', color: 'green', fontWeight: 'bold' }} /> : status === 'Failed' ? <ErrorIcon className={classes.ErrorIcon} /> : ''
                                                }

                                            </IconButton>
                                        ),
                                    }}
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
                                    value={body?.mobileNo}
                                    fullWidth
                                    className={classes.textField}
                                    onChange={inputHandler}
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
                                    body?.addresses.map((address, index) => (
                                        <Grid container spacing={0} border="1px solid lightgray" key={index}>
                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box style={{ margin: '5px' }}>Address {index + 1}</Box>
                                                <Button className={classes.activeButton} onClick={() => deleteAddressHandler(index)}>Delete</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='Address Line 1'
                                                        name="addressLine1"
                                                        value={address?.addressLine1}
                                                        fullWidth
                                                        className={classes.textField}
                                                        onChange={(e) => handleAddressChange(e, index)}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='Address Line 2'
                                                        name="addressLine2"
                                                        value={address?.addressLine2}
                                                        fullWidth
                                                        className={classes.textField}
                                                        onChange={(e) => handleAddressChange(e, index)}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        error={postCodeStatus === 'Failed'}
                                                        variant="outlined"
                                                        label='Post Code'
                                                        name="postCode"
                                                        value={address?.postCode}
                                                        fullWidth
                                                        className={classes.textField}
                                                        onChange={(e) => handlePostCodeChange(e, index)}
                                                        InputProps={index === selectedAddressIndex && {
                                                            endAdornment: (
                                                                <IconButton
                                                                    className={classes.clearButton}
                                                                // onClick={() => setBody({ ...body, panNumber: '' })}
                                                                >
                                                                    {
                                                                        postCodeStatus === 'Pending' ? <Pixel6CircularProgress /> : postCodeStatus === 'Success' ? <CheckIcon style={{ fontSize: '30px', color: 'green', fontWeight: 'bold' }} /> : postCodeStatus === 'Failed' ? <ErrorIcon className={classes.errorIcon} /> : ''
                                                                    }

                                                                </IconButton>
                                                            ),
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='City'
                                                        name="city"
                                                        value={address?.city}
                                                        fullWidth
                                                        className={classes.textField}
                                                        onChange={(e) => handleAddressChange(e, index)}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <Box style={{ margin: '5px' }}>
                                                    <TextField
                                                        variant="outlined"
                                                        label='State'
                                                        name="state"
                                                        value={address?.state}
                                                        fullWidth
                                                        className={classes.textField}
                                                        onChange={(e) => handleAddressChange(e, index)}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Button className={classes.activeButton} onClick={() => addMoreAddressesHandler()}>Add More</Button>
                                </Grid>
                                <Grid item xs={12}><Divider /></Grid>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button className={classes.activeButton} onClick={() => addCustomerHandler()}>{editCustomerDetails ? 'Save Changes' : 'Add Customer'}</Button>
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