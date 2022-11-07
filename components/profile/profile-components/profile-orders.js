import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import classes from '../../cart/cart-item/cart-item.module.css';

export default function ProfileOrders(props) {
  let orderListContent;

  if (props.orders.length > 1) {
    orderListContent = props.orders.map((order) => {
      return (
        <Accordion key={order._id}>
          <AccordionSummary
            key={order._id}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${order._id}-content`}
            id={`panel${order._id}-header`}
          >
            <Typography>Order №{order._id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {order.items.map((item) => {
              return (
                <Grid container sx={{ mt: 5 }} key={item.id}>
                  <Grid container item justifyContent="center" xs={12} md={5}>
                    <img
                      className={classes['cart-image']}
                      src={item.imageUrl}
                      alt={item.title}
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
                      <Typography sx={{ textTransform: 'uppercase' }}>
                        {item.title}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="h5">${item.totalSum}</Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid
                        container
                        item
                        xs={3}
                        sx={{ height: '3rem' }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="h5">{item.amountItems}</Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={3}
                        md={2}
                        sx={{ height: '3rem' }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography>{item.size}</Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={3}
                        md={3}
                        sx={{ height: '3rem' }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <div
                          className={classes['cart-color']}
                          style={{ backgroundColor: item.color }}
                        ></div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </AccordionDetails>
        </Accordion>
      );
    });
  } else {
    orderListContent = (
      <Typography variant="h5" textAlign="center">
        You have no orders yet. Try to make some!
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" textAlign="center" mt={5}>
        Orders List
      </Typography>
      <Box mt={2}>{orderListContent}</Box>
      <Divider sx={{ mt: 2 }} />
    </>
  );
}
