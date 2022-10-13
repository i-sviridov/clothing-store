import classes from './single-product.module.css';

import { useContext, useReducer, useEffect } from 'react';
import { FavoritesContext } from '../../../../context/favorites-context';
import Link from 'next/link';

export default function singleProduct(props) {
  const ctx = useContext(FavoritesContext);

  useEffect(() => {
    if (props.isFavorite) {
      ctx.addItem(props.data._id);
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

  let isFavorite = ctx.items.includes(props.data._id);

  console.log(isFavorite);
  console.log(ctx.items);

  function favoritesHandler() {
    if (!isFavorite) {
      ctx.addItem(props.data._id);
    }
    if (isFavorite) {
      ctx.deleteItem(props.data._id);
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

  function addToCartHandler() {
    console.log(productOptions);
    dispatchOptionsAction({ type: 'ADD_TO_CART' });
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
          <button
            className={classes['product-button']}
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
          <button
            className={classes['product-button']}
            onClick={favoritesHandler}
          >
            {isFavorite ? 'Unmark as favorite' : 'Mark as favorite'}
          </button>
          <Link href="/">
            <button className={classes['product-button']}>Return</button>
          </Link>
        </div>
      </div>
    </>
  );
}
