import { Link } from "react-router-dom";
import { URLSECTION } from "../../../../constant";
import { useEffect, useState } from "react";

const BannerSectionMain = ({ pathName }: { pathName: string }) => {
  const [state, setState] = useState("Home");
  useEffect(() => {
    if (pathName.startsWith("/product/detail")) {
      setState(`Chi tiết sản phẩm`);
    } else {
      const section = URLSECTION.find((item) => item.PATH === pathName);
      if (section) {
        setState(section.SECTTIONTITLE);
      }
    }
  }, [pathName]);

  return (
    <section className="pageBannerSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pageBannerContent text-center">
              <h2>{state}</h2>
              <div className="pageBannerPath">
                <Link to="/">Trang Chủ </Link>&nbsp;&nbsp;&gt;&nbsp;&nbsp;
                <span>{state}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSectionMain;
