import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ffedc6',
    },
    secondary: {
      main: '#724330',
    },
  },
});

export default theme;
