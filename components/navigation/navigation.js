import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Link from '../Link';
import { FavoritesContext } from '../../context/favorites-context';
import { CartContext } from '../../context/cart-context';
import { useState, useEffect, useContext } from 'react';
import CartComponent from '../cart/cart';

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const session = useSession();
  const { status } = session;

  const router = useRouter();

  const favCtx = useContext(FavoritesContext);
  const cartCtx = useContext(CartContext);

  if (typeof window !== 'undefined') {
    const items = document.cookie.split('; ').map((item) => item.split('=')[0]);
    const amount = document.cookie.split('; ').length;

    useEffect(() => {
      if (document.cookie.length > 0) {
        favCtx.fetchCookiesData(items, amount);
      }
    }, [document.cookie]);
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMobileMenuOpen}
    ></Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        component={Link}
        href="/favorites"
        onClick={handleMobileMenuClose}
      >
        <IconButton
          size="large"
          aria-label="show favorite products"
          color="inherit"
        >
          <Badge badgeContent={favCtx.amount} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          cartCtx.showCartHandler();
          handleMobileMenuClose();
        }}
      >
        <IconButton
          size="large"
          aria-label="show favorite products"
          color="inherit"
        >
          <Badge badgeContent={cartCtx.items.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }} component="navigation">
        {cartCtx.isOpen && <CartComponent />}
        <AppBar position="fixed">
          <Toolbar>
            <Box component={Link} href="/">
              <Typography variant="h6" color="black">
                Clothing Store
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show favorite products"
                color="inherit"
                component={Link}
                href="/favorites"
              >
                <Badge badgeContent={favCtx.amount} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={
                  status === 'authenticated'
                    ? cartCtx.openCartHandler
                    : () => {
                        router.push('/auth');
                      }
                }
              >
                <Badge badgeContent={cartCtx.items.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                component={Link}
                href="/profile"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
