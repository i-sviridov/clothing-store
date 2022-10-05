import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Link from '../Link';
import { BreakpointsContext } from '../../context/breakpoints-context';
import { FavoritesContext } from '../../context/favorites-context';

export default function Navigation() {
  const ctx = useContext(BreakpointsContext);
  const fvCtx = useContext(FavoritesContext);
  console.log(fvCtx);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CS
          </Typography>
          {ctx.isSmall && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {(ctx.isMedium || ctx.isLarge) && (
            <>
              <Button component={Link} href="" color="inherit">
                Wishlist
                <span>{fvCtx.favoritesAmount}</span>
              </Button>
              <Button component={Link} href="" color="inherit">
                Login
              </Button>
              <Button component={Link} href="">
                <ShoppingCartIcon sx={{ color: 'black' }}></ShoppingCartIcon>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
