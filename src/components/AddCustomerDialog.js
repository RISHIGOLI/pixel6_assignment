import { Grid, Box, Dialog, TextField, IconButton, Button, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, editCustomer, resetCustomer } from '../store/logic/customers/CustomerSlice'
import { resetPanDataInitialState, verifyPan } from '../store/logic/pan/PanSlice'
import Pixel6CircularProgress from '../utils/Pixel6CircularProgress'
import ErrorIcon from '@mui/icons-material/Error';
import { getPostCodeDetails, resetPostCodeInitialState } from '../store/logic/postcode/PostCodeSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import { isValidEmail, isValidMobile, isValidPAN } from '../utils/Validators';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

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
                borderColor: 'gray', // Change this color to the desired outline color
                borderWidth: '2px'
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
    },
}))

function AddCustomerDialog({ open, onClose, editCustomerDetails, customerIndex }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { customers, status: addCustomerStatus } = useSelector((state) => state.customers)
    const { status, statusCode, message, fullName, panNumber } = useSelector((state) => state.panData)
    const { status: postCodeStatus, statusCode: postCodeStatusCode, city, state, message: postCodeMessage } = useSelector((state) => state.postCodeData)
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
    const [selectedPostCodeIndex, setSelectedPostCodeIndex] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')
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
    const [errorBody, setErrorBody] = useState({})

    function validateForm() {
        let errorBody = {}
        let isValid = true

        if (!body.customerName) {
            errorBody.customerName = 'customer name is required'
            isValid = false
        }
        if (body.customerName && body.customerName.length < 3 || body.customerName.length > 140) {
            errorBody.customerName = 'customer name should be between 2 to 140 characters'
            isValid = false
        }
        if (!body.customerEmail) {
            errorBody.customerEmail = 'customer email is required'
            isValid = false
        }
        if (body.customerEmail && !isValidEmail(body.customerEmail)) {
            errorBody.customerEmail = 'customer email is invalid'
            isValid = false
        }
        if (body.customerEmail && body.customerEmail.length > 255) {
            errorBody.customerEmail = 'customer email length should not exceed 255'
            isValid = false
        }
        if (!body.panNumber) {
            errorBody.panNumber = 'pan number is required'
            isValid = false
        }
        if (body.panNumber && !isValidPAN(body.panNumber)) {
            errorBody.panNumber = 'pan number is invalid'
            isValid = false
        }
        if (body.panNumber && body.panNumber.length > 10) {
            errorBody.panNumber = 'pan number length should not exceed 10'
            isValid = false
        }
        if (!body.mobileNo) {
            errorBody.mobileNo = 'mobile number is required'
            isValid = false
        }
        if (body.mobileNo && body.mobileNo.length > 10) {
            errorBody.mobileNo = 'mobile number length should not exceed 10'
            isValid = false
        }
        if (body.mobileNo && !isValidMobile(body.mobileNo)) {
            errorBody.mobileNo = 'mobile number is invalid'
            isValid = false
        }

        body.addresses.forEach((address, index) => {
            if (!address.addressLine1) {
                errorBody[`addressLine1_${index}`] = 'Address Line 1 is required';
                isValid = false;
            }
            if (!address.postCode) {
                errorBody[`postCode_${index}`] = 'postcode is required';
                isValid = false;
            } else if (!/^\d{6}$/.test(address.postCode)) {
                errorBody[`postCode_${index}`] = 'postcode must be a 6 digit number';
                isValid = false;
            }
        });

        setErrorBody(errorBody)
        return isValid
    }

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
        setSelectedPostCodeIndex(index)
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
        let isFormValid = validateForm()
        if (isFormValid) {
            console.log('form is valid');
            if (editCustomerDetails) {
                setSuccessMessage('customer details edited successfully')
                dispatch(editCustomer({ customerIndex, customer: body }))
            } else {
                setSuccessMessage('customer details added successfully')
                dispatch(addCustomer(body))
            }
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
        if (status === 'Success' && fullName.length > 1) {
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

    function handleFocus(e, index) {
        console.log(`${e.target.name}_${index}`);
        const updatedErrorBody = { ...errorBody }
        if (index !== undefined && index !== null) {
            delete updatedErrorBody[`${e.target.name}_${index}`]
        } else {
            delete updatedErrorBody[e.target.name]
        }
        setErrorBody(updatedErrorBody)
    }

    function resetData() {
        if (editCustomerDetails && customerIndex !== null) {
            setBody(customers[customerIndex])
        } else {
            setBody(
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
        }
        setErrorBody({})
    }

    function handleClearAddressLines(fieldName, index) {

        setBody((body) => {
            const updatedAddresses = [...body.addresses]
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [fieldName]: ''
            }
            return {
                ...body,
                addresses: updatedAddresses
            }

        })
    }

    function handleAddMoreCustomers() {
        setBody({
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
        })
        dispatch(resetCustomer())
        dispatch(resetPanDataInitialState())
        dispatch(resetPostCodeInitialState())
        resetData()
    }

    useEffect(() => {
        console.log(body.addresses);
    }, [body])

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
                    {
                        addCustomerStatus === '' ?
                            <>
                                <Grid style={{ height: 'calc(100% - 6rem)', width: '100%', backgroundColor: 'white', overflowY: 'auto', position: 'absolute', top: '3rem', padding: '5px 0px' }} container spacing={0}>
                                    {/* full name */}
                                    <Grid item xs={12}>
                                        <Box style={{ margin: '5px' }}>
                                            <TextField
                                                error={errorBody.customerName}
                                                variant="outlined"
                                                label='Full Name'
                                                name="customerName"
                                                value={body?.customerName}
                                                fullWidth
                                                className={classes.textField}
                                                onChange={inputHandler}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            className={classes.clearButton}
                                                            onClick={() => setBody({ ...body, customerName: '' })}
                                                        >
                                                            {body.customerName && !errorBody.customerName && <CancelIcon />}
                                                            {errorBody.customerName && <ErrorIcon className={classes.errorIcon} />}
                                                        </IconButton>
                                                    ),
                                                }}
                                                onFocus={(e) => handleFocus(e)}
                                            />
                                            {errorBody.customerName && <span className={classes.errorMessage}>{errorBody.customerName}</span>}
                                        </Box>
                                    </Grid>

                                    {/* email */}
                                    <Grid item xs={12}>
                                        <Box style={{ margin: '5px' }}>
                                            <TextField
                                                error={errorBody.customerEmail}
                                                variant="outlined"
                                                label='Email'
                                                name="customerEmail"
                                                value={body?.customerEmail}
                                                fullWidth
                                                className={classes.textField}
                                                onChange={inputHandler}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            className={classes.clearButton}
                                                            onClick={() => setBody({ ...body, customerEmail: '' })}
                                                        >
                                                            {body.customerEmail && !errorBody.customerEmail && <CancelIcon />}
                                                            {errorBody.customerEmail && <ErrorIcon className={classes.errorIcon} />}
                                                        </IconButton>
                                                    ),
                                                }}
                                                onFocus={(e) => handleFocus(e)}
                                            />
                                            {errorBody.customerEmail && <span className={classes.errorMessage}>{errorBody.customerEmail}</span>}
                                        </Box>
                                    </Grid>

                                    {/* pan */}
                                    <Grid container xs={6}>
                                        <Grid item xs={status !== '' ? 10 : 12}>
                                            <Box style={{ margin: '5px' }}>
                                                <TextField
                                                    error={errorBody.panNumber}
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
                                                                {body.panNumber && !errorBody.panNumber && <CancelIcon />}
                                                                {errorBody.panNumber && <ErrorIcon className={classes.errorIcon} />}
                                                            </IconButton>
                                                        ),
                                                    }}
                                                    onFocus={(e) => handleFocus(e)}
                                                />
                                                {errorBody.panNumber && <span className={classes.errorMessage}>{errorBody.panNumber}</span>}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={status !== '' && 2} display={status === '' ? 'none' : 'flex'}>
                                            <Box style={{ margin: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4rem', marginTop: '0px' }}>
                                                {
                                                    status === 'Pending' ? <Pixel6CircularProgress /> : status === 'Success' ? <CheckIcon style={{ fontSize: '30px', color: 'green', fontWeight: 'bold' }} /> : status === 'Failed' ? <ErrorIcon className={classes.errorIcon} /> : ''
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    {/* mobile no */}
                                    <Grid item xs={6}>
                                        <Box style={{ margin: '5px' }}>
                                            <TextField
                                                error={errorBody.mobileNo}
                                                variant="outlined"
                                                label='Mobile No'
                                                name="mobileNo"
                                                value={body?.mobileNo}
                                                fullWidth
                                                className={classes.textField}
                                                onChange={inputHandler}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            className={classes.clearButton}
                                                            onClick={() => setBody({ ...body, mobileNo: '' })}
                                                        >
                                                            {body.mobileNo && !errorBody.mobileNo && <CancelIcon />}
                                                            {errorBody.mobileNo && <ErrorIcon className={classes.errorIcon} />}
                                                        </IconButton>
                                                    ),
                                                }}
                                                onFocus={(e) => handleFocus(e)}
                                            />
                                            {errorBody.mobileNo && <span className={classes.errorMessage}>{errorBody.mobileNo}</span>}
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
                                                                    error={!!errorBody[`addressLine1_${index}`]}
                                                                    variant="outlined"
                                                                    label='Address Line 1'
                                                                    name="addressLine1"
                                                                    value={address?.addressLine1}
                                                                    fullWidth
                                                                    className={classes.textField}
                                                                    onChange={(e) => handleAddressChange(e, index)}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <IconButton
                                                                                className={classes.clearButton}
                                                                                onClick={() => handleClearAddressLines('addressLine1', index)}
                                                                            >
                                                                                {address.addressLine1 && !errorBody[`addressLine1_${index}`] && <CancelIcon />}
                                                                                {errorBody[`addressLine1_${index}`] && <ErrorIcon className={classes.errorIcon} />}
                                                                            </IconButton>
                                                                        ),
                                                                    }}
                                                                    onFocus={(e) => handleFocus(e, index)}
                                                                />
                                                                {errorBody[`addressLine1_${index}`] && <span className={classes.errorMessage}>{errorBody[`addressLine1_${index}`]}</span>}
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
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <IconButton
                                                                                className={classes.clearButton}
                                                                                onClick={() => handleClearAddressLines('addressLine2', index)}
                                                                            >
                                                                                {address.addressLine2 && <CancelIcon />}
                                                                            </IconButton>
                                                                        ),
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Grid>

                                                        <Grid container xs={12} md={4} display="flex" spacing={0}>
                                                            <Grid style={{ margin: '5px' }} item xs={9}>
                                                                <TextField
                                                                    error={errorBody[`postCode_${index}`]}
                                                                    variant="outlined"
                                                                    label='Post Code'
                                                                    name="postCode"
                                                                    value={address?.postCode}
                                                                    fullWidth
                                                                    className={classes.textField}
                                                                    onChange={(e) => handlePostCodeChange(e, index)}
                                                                    InputProps={index === selectedPostCodeIndex && {
                                                                        endAdornment: (
                                                                            <IconButton
                                                                                className={classes.clearButton}
                                                                                onClick={() => setBody({ ...body, panNumber: '' })}
                                                                            >
                                                                                {address.postCode && !errorBody[`postCode_${index}`] && <CancelIcon />}
                                                                                {errorBody[`postCode_${index}`] && <ErrorIcon className={classes.errorIcon} />}
                                                                            </IconButton>
                                                                        ),
                                                                    }}
                                                                    onFocus={(e) => handleFocus(e, index)}
                                                                    style={{marginRight: '0px'}}
                                                                />
                                                                {errorBody[`postCode_${index}`] && <span className={classes.errorMessage}>{errorBody[`postCode_${index}`]}</span>}
                                                            </Grid>
                                                            <Grid item display={postCodeStatus === '' ? 'none' : 'flex'}>
                                                                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4rem', marginTop: '0px' }}>
                                                                    {
                                                                        postCodeStatus === 'Pending' ? <Pixel6CircularProgress /> : postCodeStatus === 'Success' ? <CheckIcon style={{ fontSize: '30px', color: 'green', fontWeight: 'bold' }} /> : postCodeStatus === 'Failed' ? <ErrorIcon className={classes.errorIcon} /> : ''
                                                                    }
                                                                </Box>
                                                            </Grid>
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid style={{ backgroundColor: 'white', height: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px', width: '100%', position: 'absolute', bottom: 0, borderTop: '1px solid lightgray', zIndex: 1200 }}>
                                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button className={classes.activeButton} onClick={() => addCustomerHandler()}>{editCustomerDetails ? 'Save Changes' : 'Add Customer'}</Button>
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button className={classes.activeButton} onClick={() => resetData()}>Reset</Button>
                                        <Button className={classes.activeButton} onClick={onClose}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </> :
                            <Grid style={{ height: 'calc(100% - 3rem)', width: '100%', overflowY: 'auto', position: 'absolute', top: '3rem' }} container spacing={0}>
                                <Grid style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <TaskAltIcon style={{ color: 'rgb(0, 125, 0)', fontSize: '5rem' }} fontSize="large" />
                                        <Box style={{ fontWeight: 'bold' }}>{successMessage}</Box>
                                        <Grid><Button className={classes.activeButton} onClick={() => handleAddMoreCustomers()}>Add More</Button></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    }

                </Grid>
            </Dialog>
        </>
    )
}

export default AddCustomerDialog