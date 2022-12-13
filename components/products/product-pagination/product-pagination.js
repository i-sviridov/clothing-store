import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

export default function ProductPagination({
  itemsPerPage,
  totalItems,
  paginate,
  page,
}) {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <Stack spacing={2} component={Grid} alignItems="center" mt={3}>
      <Pagination
        color="secondary"
        count={paginationNumbers.length}
        onChange={(event, number) => {
          paginate(number);
        }}
        page={page}
      />
    </Stack>
  );
}
