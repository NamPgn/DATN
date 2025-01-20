import Slider from "react-slick";

const SlideShow = () => {
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, 
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />, 
  };

  return (
    <div className="mt-5 ">
      <Slider {...settings} className="rounded position-relative">
        <div>
          <img
            className="img-fluid w-100 rounded"
            src="https://theme.hstatic.net/1000290074/1001116344/14/slider_2.jpg?v=6810"
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            className="img-fluid w-100 rounded"
            src="https://theme.hstatic.net/1000290074/1001116344/14/slider_3.jpg?v=6810"
            alt="Slide 2"
          />
        </div>
        <div>
          <img
            className="img-fluid w-100 rounded"
            src="https://theme.hstatic.net/1000290074/1001116344/14/slider_5.jpg?v=6810"
            alt="Slide 3"
          />
        </div>
      </Slider>
    </div>
  );
};

// Tùy chỉnh nút next
const SampleNextArrow = (props:any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} btn btn-dark `}
      style={{ right: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      &#8250; {/* Biểu tượng mũi tên */}
    </button>
  );
};

// Tùy chỉnh nút prev
const SamplePrevArrow = (props:any) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} btn btn-dark`}
      style={{ left: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      &#8249; {/* Biểu tượng mũi tên */}
    </button>
  );
};

export default SlideShow;
