import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CustomersPage from './pages/CustomersPage';

const useStyles = makeStyles((theme) => ({
  mainRootContainer: {
    height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }
}))

function App() {
  const classes = useStyles()
  return (
    <Grid className={classes.mainRootContainer}>
      <Grid style={{ height: '90%', width: '95%', backgroundColor: 'whitesmoke', boxShadow: '#b6b6dd 5px 5px 25px, #e9dddd 10px 10px 25px, white 15px 15px 50px', borderRadius: '0.5rem' }}>
        <CustomersPage />
      </Grid>
    </Grid>
  );
}

export default App;
