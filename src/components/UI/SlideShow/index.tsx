import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const SlideShow = () => {
  return (
    <Slider {...settings} className="mt-5">
      <div>
        <img
          className="w-100"
          src="https://file.hstatic.net/200000472237/file/chup-anh-quan-ao-dep-bang-dien-thoai_ed543464b2c248588df949f9618361f8_grande.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-100"
          src="https://file.hstatic.net/200000472237/file/chup-anh-quan-ao-dep-bang-dien-thoai_ed543464b2c248588df949f9618361f8_grande.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-100"
          src="https://file.hstatic.net/200000472237/file/chup-anh-quan-ao-dep-bang-dien-thoai_ed543464b2c248588df949f9618361f8_grande.jpg"
          alt=""
        />
      </div>
    </Slider>
  );
};

export default SlideShow;
