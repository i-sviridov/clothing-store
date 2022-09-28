import Typography from '@mui/material/Typography';
import Products from './products/products';

export default function Main(props) {
  return (
    <>
      <Typography
        paragraph
        align="center"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
        mt={3}
      >
        Clothing Store
      </Typography>
      <Products data={props.data} />
    </>
  );
}
