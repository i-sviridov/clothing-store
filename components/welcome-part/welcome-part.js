import classes from './welcome-part.module.css';

export default function welcomePart() {
  return (
    <>
      <img
        className={classes['welcome-image']}
        src="/images/clothing-store-image.jpg"
        alt="clothing store image"
      />
      <section className={classes['welcome-text']}>
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
      </section>
    </>
  );
}
