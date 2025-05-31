import { Carousel } from "react-bootstrap";
import img1 from "../assets/bus1.jpg";
import img2 from "../assets/bus.jpg";
import img3 from "../assets/bus3.jpg";
import img4 from "../assets/bus4.jpg";

const ImageCarousel = () => {
  return (
    <Carousel fade interval={1000}>
      <Carousel.Item>
        <img className="d-block w-100 rounded carousel-img" src={img1} alt="Bus 1" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 rounded carousel-img" src={img2} alt="Bus 2" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 rounded carousel-img" src={img3} alt="Bus 3" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 rounded carousel-img" src={img4} alt="Bus 4" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
