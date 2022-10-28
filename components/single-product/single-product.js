import classes from './single-product.module.css';

import { useContext, useReducer, useEffect } from 'react';
import { FavoritesContext } from '../../context/favorites-context';
import { CartContext } from '../../context/cart-context';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function singleProduct(props) {
  const favCtx = useContext(FavoritesContext);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (props.isFavorite) {
      favCtx.addItem(props.data._id);
    }
  }, [props.isFavorite]);

  const defaultProductOptions = {
    color: props.data.colors[0],
    size: props.data.sizes[0],
    totalPrice: +props.data.price,
    selectedAmount: 1,
  };

  function productOptionsReducer(state, action) {
    if (action.type === 'COLOR') {
      return {
        ...state,
        color: action.color,
      };
    }

    if (action.type === 'SIZE') {
      return {
        ...state,
        size: action.size,
      };
    }

    if (action.type === 'DECREASE_AMOUNT') {
      if (state.selectedAmount === 1) {
        return state;
      }
      return {
        ...state,
        selectedAmount: state.selectedAmount - 1,
        totalPrice: (state.selectedAmount - 1) * +props.data.price,
      };
    }

    if (action.type === 'INCREASE_AMOUNT') {
      if (state.selectedAmount >= 10) {
        return state;
      }
      return {
        ...state,
        selectedAmount: state.selectedAmount + 1,
        totalPrice: (state.selectedAmount + 1) * +props.data.price,
      };
    }

    if (action.type === 'ADD_TO_CART') {
      return defaultProductOptions;
    }

    return defaultProductOptions;
  }

  const [productOptions, dispatchOptionsAction] = useReducer(
    productOptionsReducer,
    defaultProductOptions
  );

  let isFavorite = favCtx.items.includes(props.data._id);

  function favoritesHandler() {
    if (!isFavorite) {
      favCtx.addItem(props.data._id);
    }
    if (isFavorite) {
      favCtx.deleteItem(props.data._id);
    }
  }

  function colorOptionPickHandler(color) {
    dispatchOptionsAction({ type: 'COLOR', color });
  }

  function sizeOptionPickHandler(event) {
    dispatchOptionsAction({ type: 'SIZE', size: event.target.value });
  }

  function changeAmountHandler(type) {
    dispatchOptionsAction({ type });
  }

  return (
    <>
      <h1 className={classes['product-title']}>{props.data.title}</h1>
      <div className={classes['product-container']}>
        <img src={props.data.imageUrl} className={classes['product-image']} />
        <p className={classes['product-description']}>
          {props.data.description}
        </p>

        <div className={classes['product-color']}>
          <p>Color</p>
          <div className={classes[`product-color-items`]}>
            {props.data.colors.map((color) => (
              <div
                className={`${classes['product-color-item']} ${
                  color === productOptions.color ? classes['active'] : ''
                }`}
                style={{ backgroundColor: color }}
                key={color}
                onClick={colorOptionPickHandler.bind(null, color)}
              />
            ))}
          </div>
        </div>

        <div className={classes['product-sizes']}>
          <p>Sizes</p>
          <select
            id="sizes"
            className={classes['product-select']}
            onClick={sizeOptionPickHandler}
          >
            {props.data.sizes.map((size) => {
              return (
                <option key={size} htmlFor="sizes" value={size}>
                  {size}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes['product-cart']}>
          <p className={classes['product-price']}>
            {productOptions.totalPrice + '.00$'}
          </p>
          <div className={classes['product-amount']}>
            <button onClick={changeAmountHandler.bind(null, 'DECREASE_AMOUNT')}>
              -
            </button>
            <p>{productOptions.selectedAmount}</p>
            <button onClick={changeAmountHandler.bind(null, 'INCREASE_AMOUNT')}>
              +
            </button>
          </div>
        </div>
        <div className={classes['product-buttons']}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 4, mt: 2, width: '12rem' }}
            // className={`button ${classes['product-button']}`}
            onClick={cartCtx.addToCartHandler.bind(
              null,
              props.data._id,
              props.data.title,
              props.data.imageUrl,
              productOptions.color,
              productOptions.size,
              props.data.price,
              productOptions.selectedAmount,
              productOptions.totalPrice
            )}
          >
            Add to cart
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 4, mt: 2, width: '12rem' }}
            // className={`button ${classes['product-button']}`}
            onClick={favoritesHandler}
          >
            {isFavorite ? 'Unmark as favorite' : 'Mark as favorite'}
          </Button>
          <Link href="/">
            <Button
              sx={{ mx: 4, mt: 2, width: '12rem' }}
              variant="contained"
              color="secondary"
              // className={`button ${classes['product-button']}`}
            >
              Back to main page
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
