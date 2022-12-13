import { useState } from "react";

import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CartItem from "./cart-item/cart-item";
import CloseIcon from "@mui/icons-material/Close";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart/cart-slice";

export default function CartComponent() {
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const router = useRouter();

  const cartStore = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let renderedContent;

  if (cartStore.items.length > 0) {
    renderedContent = cartStore.items.map((item) => {
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
    <Drawer
      transitionDuration={400}
      open
      anchor="right"
      onClose={() => {
        dispatch(cartActions.closeCart());
      }}
    >
      {isSendingRequest && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
          <CloseIcon
            onClick={() => {
              dispatch(cartActions.closeCart());
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      {renderedContent}
      <Divider sx={{ mt: 2 }} />
      <Typography sx={{ mt: 2 }} variant="h4" textAlign="center">
        Total Amount: ${cartStore.cartSum}
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Button
          disabled={cartStore.items.length > 0 ? false : true}
          color="secondary"
          sx={{ width: "10rem", mt: 3, mx: 3 }}
          variant="contained"
          onClick={() => {
            fetch("https://app.aaccent.su/js/confirm.php ", {
              mode: "no-cors",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cartStore.items),
            }).then(() => {
              console.log("Акцент на результат!");
            });

            setIsSendingRequest(true);
            fetch("/api/add-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cartStore.items),
            }).then((response) => {
              router.replace("/profile");
              setIsSendingRequest(false);
              dispatch(cartActions.clearCart());
            });
          }}
        >
          Order Now
        </Button>
        <Button
          color="secondary"
          sx={{ width: "10rem", mt: 3, mx: 3 }}
          variant="contained"
          onClick={() => {
            dispatch(cartActions.closeCart());
          }}
        >
          Close Cart
        </Button>
      </Grid>
    </Drawer>
  );
}
