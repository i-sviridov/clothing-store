import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#acb7e6',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;
