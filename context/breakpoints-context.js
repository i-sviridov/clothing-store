import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const BreakpointsContext = React.createContext({
  isSmall: null,
  isMedium: null,
  isLarge: null,
});

export const BreakpointsContextProvider = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <BreakpointsContext.Provider value={{ isSmall, isMedium, isLarge }}>
      {props.children}
    </BreakpointsContext.Provider>
  );
};
