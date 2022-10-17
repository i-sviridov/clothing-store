import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductsFilter(props) {
  return (
    <FormControl
      sx={{
        width: { xs: '100%', sm: '10rem', lg: '15rem' },
        my: { xs: 1, sm: 5 },
      }}
    >
      <InputLabel id={props.filterData.inputLabelId} sx={{ height: '10rem' }}>
        {props.filterData.inputLabel}
      </InputLabel>
      <Select
        labelId={props.filterData.inputLabelId}
        id={props.filterData.selectLabelId}
        value={props.activeFilter}
        label={props.filterData.selectLabel}
        onChange={props.onClick.bind(null, props.filterData.inputLabel)}
      >
        {props.filterData.options.map((item) => {
          return (
            <MenuItem key={item.key} value={item.key}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
