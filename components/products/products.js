import { useEffect } from "react";
import ProductsFilter from "./products-filter/product-filter";
import categoryFilterData from "./categoryFilterData";
import priceFilterData from "./priceFilterData";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";

import ProductItem from "./product-item/product-item";
import ProductPagination from "./product-pagination/product-pagination";
import { useDispatch, useSelector } from "react-redux";
import { productsAction } from "../../store/products/products-slice";

export default function Products(props) {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Initial redux defaul state initialization with props data

  useEffect(() => {
    dispatch(productsAction.setDisplayedItems(props.data));
  }, []);

  // Pagination render logic

  const itemsPerPage = 6;
  const indexOfLastItem = productsState.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsState.items.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  let renderedContent;

  if (productsState.items.length > 0) {
    renderedContent = currentItems.map((element) => (
      <ProductItem
        data={element}
        filter={productsState.category}
        key={element._id}
      />
    ));
  } else {
    renderedContent = (
      <Typography variant="h4" sx={{ my: 3 }}>
        There are no products matching criteria available!
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        m: 3,
        backgroundColor: "white",
        borderRadius: "10px",
        minHeight: "60rem",
      }}
    >
      <Grid container justifyContent="space-between" item xs={12}>
        <ProductsFilter
          filterData={categoryFilterData}
          onClick={(event) => {
            dispatch(
              productsAction.setItemCategory({
                category: event.target.value,
                initialProps: props.data,
              })
            );
          }}
          activeFilter={productsState.category}
        />
        <ProductsFilter
          filterData={priceFilterData}
          onClick={(event) => {
            dispatch(
              productsAction.sortByPrice({
                price: event.target.value,
                initialProps: props.data,
              })
            );
          }}
          activeFilter={productsState.price}
        />
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mt: { xs: 3, sm: 0 } }}
      >
        {renderedContent}
      </Grid>
      <ProductPagination
        itemsPerPage={itemsPerPage}
        totalItems={productsState.items.length}
        paginate={(pageNumber) => {
          dispatch(productsAction.setCurrentPage(pageNumber));
        }}
        page={productsState.currentPage}
      />
    </Box>
  );
}
