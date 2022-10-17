import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ffb74d',
    },
    secondary: {
      main: '#ecf6fb',
    },
  },
});

export default theme;
