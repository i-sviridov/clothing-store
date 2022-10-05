import Typography from '@mui/material/Typography';
import Products from './products/products';

export default function Main(props) {
  return (
    <>
      <Products data={props.data} />
    </>
  );
}
