import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react';
import { useEffect } from 'react';
import EntryMessageDialog from './components/EntryMessageDialog';
import CustomersPage from './pages/CustomersPage';

const useStyles = makeStyles((theme) => ({
  mainRootContainer: {
    height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }
}))

function App() {
  const classes = useStyles()
  const [showEntryMessageDialog, setShowEntryMessageDialog] = useState(false)
  useEffect(() => {
    // setShowEntryMessageDialog(true)
  }, [])
  return (
    <Grid className={classes.mainRootContainer}>
      <Grid style={{ height: '90%', width: '95%', backgroundColor: 'whitesmoke', boxShadow: '#b6b6dd 5px 5px 25px, #e9dddd 10px 10px 25px, white 15px 15px 50px', borderRadius: '0.5rem' }}>
        <CustomersPage />
      </Grid>
      {
        showEntryMessageDialog && <EntryMessageDialog open={showEntryMessageDialog} onClose={() => setShowEntryMessageDialog(false)} />
      }
    </Grid>
  );
}

export default App;
