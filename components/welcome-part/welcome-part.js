import classes from './welcome-part.module.css';

import { motion } from 'framer-motion';

const ProductionVariants = {
  initial: { y: 150 },
  animate: {
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 2 },
  },
};

const MotionProps = {
  initial: 'initial',
  whileInView: 'animate',
  viewport: { once: true },
  variants: ProductionVariants,
  whileHover: {
    scale: 1.1,
    textShadow: '0px 0px 8px rgb(255,255,255)',
    boxShadow: '0px 0px 8px rgb(255,255,255)',
  },
};

export default function welcomePart() {
  return (
    <>
      <div className={classes['slider-box']}>
        <div className={classes.slider}>
          <div className={classes['slide-track']}>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image-2.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image-3.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image-4.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image-2.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image-3.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
            <div className={classes.slide}>
              <img
                src="/images/clothing-store-image-4.jpg"
                height="600"
                width="800"
                alt="carousel-image"
              />
            </div>
          </div>
        </div>
      </div>
      <motion.section {...MotionProps} className={classes['welcome-text']}>
        <h2>Welcome To Our Clothing Store With The Best Prices!</h2>
        <p>
          Choose your favorite clothes among different categories and price
          ranges!
        </p>
        <p>
          All our clothes are made from high-quality materials by our best
          manufacturers and of course all our orders are delievered
          just-in-time!
        </p>
      </motion.section>
    </>
  );
  {
    /* <img
        className={classes['welcome-image']}
        src="/images/clothing-store-image.jpg"
        alt="clothing store image"
      /> */
  }
  // );
}
