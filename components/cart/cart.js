import { useState, useContext, useEffect } from 'react';

import { CartContext } from '../../context/cart-context';

import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CartItem from './cart-item/cart-item';
import CloseIcon from '@mui/icons-material/Close';

import { useRouter } from 'next/router';

export default function CartComponent() {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const router = useRouter();
  const ctx = useContext(CartContext);

  useEffect(() => {
    if (ctx.items.length > 0) {
      setIsCartEmpty(false);
    } else setIsCartEmpty(true);
  }, [ctx.items]);

  let renderedContent;

  if (!isCartEmpty) {
    renderedContent = ctx.items.map((item) => {
      return (
        <CartItem
          key={item.title}
          imageSrc={item.imageUrl}
          title={item.title}
          color={item.color}
          size={item.size}
          quantity={item.amountItems}
          amount={item.totalSum}
          id={item.id}
          onAmountChange={ctx.itemAmountChangeHandler}
          onDeleteClick={ctx.deleteItemHandler}
        />
      );
    });
  } else
    renderedContent = (
      <Typography variant="h5" textAlign="center" sx={{ mt: 2 }}>
        No items in cart. Try to add some!
      </Typography>
    );

  return (
    <Drawer open anchor="right" onClose={ctx.closeCartHandler}>
      {isSendingRequest && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Grid container sx={{ my: 2 }} alignItems="center">
        <Grid item xs={11}>
          <Typography variant="h4" textAlign="center">
            Your Cart
          </Typography>
        </Grid>
        <Grid container item xs={1}>
          <CloseIcon onClick={ctx.closeCartHandler} />
        </Grid>
      </Grid>
      <Divider />
      {renderedContent}
      <Divider sx={{ mt: 2 }} />
      <Typography sx={{ mt: 2 }} variant="h4" textAlign="center">
        Total Amount: ${ctx.cartSum}
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Button
          disabled={isCartEmpty}
          color="secondary"
          sx={{ width: '10rem', mt: 3, mx: 3 }}
          variant="contained"
          onClick={() => {
            setIsSendingRequest(true);
            fetch('/api/add-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ctx.items),
            }).then((response) => {
              router.replace('/profile');
              setIsSendingRequest(false);
              ctx.closeCartHandler();
            });
          }}
        >
          Order Now
        </Button>
        <Button
          color="secondary"
          sx={{ width: '10rem', mt: 3, mx: 3 }}
          variant="contained"
          onClick={ctx.closeCartHandler}
        >
          Close Cart
        </Button>
      </Grid>
    </Drawer>
  );
}
