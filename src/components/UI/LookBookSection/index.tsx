import { useGetCategoryLookBook } from "../../../hook/categorys";

const LookBookSection = () => {
  const { data } = useGetCategoryLookBook();

  // Mảng chứa các transform styles tương ứng với vị trí của từng item
  const transformStyles = [
    { transform: "translate(0px, 0px) scale(1)" },
    { transform: "translate(440px, 0px) scale(1)" },
    { transform: "translate(880px, 0px) scale(1)" },
    { transform: "translate(0px, 344px) scale(1)" },
    { transform: "translate(880px, 344px) scale(1)" },
    { transform: "translate(440px, 564px) scale(1)" }
  ];

  return (
    <section className="lookbookSection">
      <div className="container">
        <div
          className="row masonryGrid shuffle"
          id="masonryGrid"
          style={{
            position: "relative",
            overflow: "hidden",
            height: 908,
            transition: "height 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {data?.data?.map((category: any, index: number) => (
            <div
              key={category.id}
              className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
              style={{
                position: "absolute",
                top: 0,
                visibility: "visible",
                willChange: "transform",
                left: 0,
                opacity: 1,
                transitionDuration: "250ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionProperty: "transform, opacity",
                ...transformStyles[index]
              }}
            >
              <div className="lookBook01 overLayAnim01">
                <div className="lbContent">
                  <h3>{category.name}</h3>
                  <h2>{category.children?.length ? `${category.children.length} Danh mục con` : 'Không có danh mục con'}</h2>
                  <a href={`/collections/${category.slug}`} className="ulinaLink">
                    <i className="fa-solid fa-angle-right" />
                    Xem chi tiết
                  </a>
                </div>
                <img 
                  src={`/assets/images/home1/${(index % 6) + 1}.png`} 
                  alt={category.name} 
                />
              </div>
            </div>
          ))}
          <div className="col-lg-1 col-sm-1 shafSizer" />
        </div>
      </div>
    </section>
  );
};

export default LookBookSection;

