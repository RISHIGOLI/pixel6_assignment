import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

// Inspired by the former Facebook spinners.
function FacebookCircularProgress({thickness = 4}) {
  return (
    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
      {/* <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        value={100}
      /> */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? 'rgb(127, 12, 134)' : 'rgb(127, 12, 134)'),
          animationDuration: '550ms',
          
        //   left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={30}
        thickness={thickness}
      />
    </Box>
  );
}

export default function Pixel6CircularProgress(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FacebookCircularProgress thickness={props.thickness}/>
    </Box>
  );
}
