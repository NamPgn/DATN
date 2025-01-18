import Slider from "react-slick";

const SlideShow = () => {
  const settings = {
    dots: false,
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
      <Slider {...settings} className="mt-5">
        <div>
          <img 
          className="w-100"
            src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg"
            alt=""
          />
        </div>
      </Slider>
  );
};

export default SlideShow;
