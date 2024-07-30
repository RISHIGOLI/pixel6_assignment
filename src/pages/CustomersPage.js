import { Grid, Box, Button, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import AddCustomerDialog from '../components/AddCustomerDialog'

const useStyles = makeStyles((theme) => ({
    customersPageContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column !important',
        width: 'auto',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        borderRadius: 'inherit'
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
    column: {
        display: 'flex',
        justifyContent: 'center',
        borderRight: '1px solid lightgrey'
    },
    fillRemainingSpace: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'pink',
        height: 'calc(100% - 110px)',
        overflowY: 'auto'
    }
}))

function CustomersPage() {
    const classes = useStyles()
    const [openAddCustomerDialog, setOpenAddCustomerDialog] = useState(false)
    return (
        <>
            <Grid className={classes.customersPageContainer}>
                <Grid style={{ width: '100%', height: '4rem', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid lightgray', borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' }}>
                    <Box style={{marginLeft: '5px', fontSize: '20px', fontFamily:'fantasy'}}>Pixel6 CRUD Application</Box>
                    <Button className={classes.activeButton} onClick={()=>setOpenAddCustomerDialog(true)}>Add Customer</Button>
                </Grid>
                <Grid style={{ width: '100%', height: 'calc(100% - 4rem)', backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: '0.25rem', borderBottomLeftRadius:'inherit', borderBottomRightRadius: 'inherit' }}>
                    <Grid style={{ backgroundColor: 'gray', display: 'flex', alignItems: 'center', padding: '15px 0px', color: 'white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', position: 'sticky', paddingRight: '4px' }}>
                        <Box style={{ width: '5%' }} className={classes.column}>Sr No</Box>
                        <Box style={{ width: '20%' }} className={classes.column}>Customer Name</Box>
                        <Box style={{ width: '20%' }} className={classes.column}>Email</Box>
                        <Box style={{ width: '15%' }} className={classes.column}>Mobile No</Box>
                        <Box style={{ width: '15%' }} className={classes.column}>PAN No</Box>
                        <Box style={{ width: '30%', border: 'none' }} className={classes.column}>Address</Box>
                    </Grid>
                    <Grid style={{ height: '100%', width: '100%', overflowY: 'auto', border: '1px solid gray' }}>
                        {
                            Array(20).fill(1).map((item, index) => (
                                <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid lightgrey', height: '4rem', overflow: 'hidden' }} key={index}>
                                    <Box style={{ width: '5%' }} className={classes.column}>Sr No</Box>
                                    <Box style={{ width: '20%' }} className={classes.column}>Customer Name</Box>
                                    <Box style={{ width: '20%' }} className={classes.column}>Email</Box>
                                    <Box style={{ width: '15%' }} className={classes.column}>Mobile No</Box>
                                    <Box style={{ width: '15%' }} className={classes.column}>PAN No</Box>
                                    <Box style={{ width: '30%', border: 'none' }} className={classes.column}>Address</Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                {
                    openAddCustomerDialog && <AddCustomerDialog open={openAddCustomerDialog} onClose={()=>setOpenAddCustomerDialog(false)}/>
                }
            </Grid>
        </>
    )
}

export default CustomersPage