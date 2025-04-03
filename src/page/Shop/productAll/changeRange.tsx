import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRange = ({ minPrice = 0, maxPrice = 20000000, onChange }:any) => {
  const [range, setRange] = useState([minPrice, maxPrice]);

  const handleChange = (value:any) => {
    setRange(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <aside className="widget priceFilter">
      <h3 className="widgetTitle">Khoảng giá</h3>
      <div className="shopWidgetWraper">
        <div className="priceFilterSlider">
          <form className="clearfix">
            <Slider
              range
              min={minPrice}
              max={maxPrice}
              value={range}
              onChange={handleChange}
              trackStyle={[{ backgroundColor: "#9ebbbd" }]}
              handleStyle={[
                { borderColor: "#9ebbbd" },
                { borderColor: "#9ebbbd" },
              ]}
            />
            <div className="pfsWrap">
              <label>Giá: </label>
              <span>${range[0]} - ${range[1]}</span>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default PriceRange;
