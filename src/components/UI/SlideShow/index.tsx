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
          src="https://images2.thanhnien.vn/zoom/656_410/528068263637045248/2024/12/10/1000024907-17338163754242082979995-0-0-1123-1797-crop-173381639862577774972.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-100"
          src="https://images2.thanhnien.vn/zoom/656_410/528068263637045248/2025/1/3/trang-15-17355468067791340735833-47-0-1247-1920-crop-17358644184854323842.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-100"
          src="https://images2.thanhnien.vn/zoom/656_410/528068263637045248/2025/1/8/phao-hoa-nhin-tu-khach-san-novotel-17363062250122059181239-0-0-1600-2560-crop-17363067458141183265062.jpeg"
          alt=""
        />
      </div>
      <div>
        <img
          className="w-100"
          src="https://images2.thanhnien.vn/zoom/656_410/528068263637045248/2025/1/6/ma-thien-lanh-anh-14-1736154018429118894947-0-0-1600-2560-crop-17361563485551522081241.jpg"
          alt=""
        />
      </div>
    </Slider>
  );
};

export default SlideShow;
