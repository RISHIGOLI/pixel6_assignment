import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddCustomerDialog from './components/AddCustomerDialog';

const useStyles = makeStyles((theme) => ({
  mainRootContainer: {
    height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }
}))

function App() {
  const classes = useStyles()
  return (
    <Grid className={classes.mainRootContainer}>
      <Grid style={{height: '90%', width: '90%', backgroundColor: 'pink'}}>
          <AddCustomerDialog/>
      </Grid>
    </Grid>
  );
}

export default App;
