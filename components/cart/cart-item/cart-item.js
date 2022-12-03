import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart/cart-slice";

import classes from "./cart-item.module.css";

import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function CartItem(props) {
  const dispatch = useDispatch();

  function itemChangeHandler(event) {
    if (event.target.value < 1) {
      dispatch(
        cartActions.deleteItemFromCart({
          id: props.id,
          color: props.color,
          size: props.size,
        })
      );
      return;
    }

    let newAmount = event.target.value;
    if (event.target.value > 10) {
      newAmount = 10;
    }

    dispatch(cartActions.setNewItemCartAmount({ id: props.id, newAmount }));
  }

  return (
    <Grid container sx={{ mt: 5 }}>
      <Grid container item justifyContent="center" xs={12} md={5}>
        <img
          className={classes["cart-image"]}
          src={props.imageSrc}
          alt={props.title}
        />
      </Grid>

      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={7}
        rowSpacing={3}
      >
        <Grid item>
          <Typography sx={{ textTransform: "uppercase" }}>
            {props.title}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">${props.amount}</Typography>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center">
          <Grid
            container
            item
            xs={3}
            sx={{ height: "3rem" }}
            justifyContent="center"
          >
            <TextField
              id="filled-number"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              color="secondary"
              defaultValue={props.quantity}
              sx={{ width: "3.5rem" }}
              InputProps={{
                inputProps: {
                  min: 0,
                  max: 10,
                },
              }}
              helperText="10 - max"
              onChange={itemChangeHandler}
            />
          </Grid>
          <Grid
            item
            container
            xs={3}
            md={2}
            sx={{ height: "3rem" }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography>{props.size}</Typography>
          </Grid>
          <Grid
            item
            container
            xs={3}
            md={3}
            sx={{ height: "3rem" }}
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={classes["cart-color"]}
              style={{ backgroundColor: props.color }}
            ></div>
          </Grid>
          <Grid
            item
            container
            xs={3}
            md={2}
            sx={{ height: "3rem" }}
            justifyContent="center"
            alignItems="center"
            onClick={() => {
              dispatch(
                cartActions.deleteItemFromCart({
                  id: props.id,
                  color: props.color,
                  size: props.size,
                })
              );
            }}
          >
            <DeleteIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
