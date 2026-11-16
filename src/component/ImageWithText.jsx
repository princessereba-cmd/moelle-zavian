// Two-column block: image on one side, heading + text (+ optional button) on the other.
// Set reverse to put the image on the right.
function ImageWithText({ image, imageAlt = "", title, children, reverse = false }) {
  return (
    <section className={`image-with-text ${reverse ? "image-with-text--reverse" : ""}`}>
      <div className="image-with-text__media">
        <img src={image} alt={imageAlt} loading="lazy" />
      </div>
      <div className="image-with-text__content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default ImageWithText;
