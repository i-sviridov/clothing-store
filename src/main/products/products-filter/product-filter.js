import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductsFilter(props) {
  return (
    <FormControl sx={{ width: { xs: '100%', sm: '10rem' }, my: 5 }}>
      <InputLabel id="select-label" variant="filled">
        Category
      </InputLabel>
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value="all"
        label="Age"
        defaultValue={20}
        onChange={props.onClick}
      >
        <MenuItem value={'all-products'}>All Products</MenuItem>
        <MenuItem value={'shirts'}>Shirts</MenuItem>
        <MenuItem value={'pants'}>Pants</MenuItem>
        <MenuItem value={'shoes'}>Shoes</MenuItem>
        <MenuItem value={'socks'}>Socks</MenuItem>
      </Select>
    </FormControl>
  );
}
