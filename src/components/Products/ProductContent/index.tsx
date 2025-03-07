// const ProductContent = ({ products }: any) => {
//   return (
//     <div className="row relatedProductRow">
//       <div className="col-lg-12">
//         <h2 className="secTitle">More Products Like This</h2>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="productCarousel owl-carousel owl-loaded owl-drag">
//               <div className="owl-stage-outer">
//                 <div
//                   className="owl-stage"
//                   style={{
//                     transform: "translate3d(0px, 0px, 0px)",
//                     transition: "all",
//                     width: 1980,
//                   }}
//                 >
//                   {products.map((product: any, index: number) => (
//                     <div
//                       key={index}
//                       className="owl-item active"
//                       style={{ width: 306, marginRight: 24 }}
//                     >
//                       <div className="productItem01">
//                         <div className="pi01Thumb">
//                           <img src={product.image1} alt="Product Image" />
//                           <img src={product.image2} alt="Product Image" />
//                           <div className="pi01Actions">
//                             <a href="#" className="pi01Cart">
//                               <i className="fa-solid fa-shopping-cart" />
//                             </a>
//                             <a href="#" className="pi01QuickView">
//                               <i className="fa-solid fa-arrows-up-down-left-right" />
//                             </a>
//                             <a href="#" className="pi01Wishlist">
//                               <i className="fa-solid fa-heart" />
//                             </a>
//                           </div>
//                           <div className="productLabels clearfix">
//                             <span className="plDis">- ${product.discount}</span>
//                             <span className="plSale">Sale</span>
//                           </div>
//                         </div>
//                         <div className="pi01Details">
//                           <div className="productRatings">
//                             <div className="productRatingWrap">
//                               <div className="star-rating">
//                                 <span />
//                               </div>
//                             </div>
//                             <div className="ratingCounts">
//                               {product.reviews} Reviews
//                             </div>
//                           </div>
//                           <h3>
//                             <a href={product.detailsLink}>{product.title}</a>
//                           </h3>
//                           <div className="pi01Price">
//                             <ins>${product.price}</ins>
//                             <del>${product.oldPrice}</del>
//                           </div>
//                           <div className="pi01Variations">
//                             <div className="pi01VColor">
//                               {product.colors.map((color: any, idx: any) => {
//                                 return (
//                                   <div
//                                     key={idx}
//                                     className={`pi01VCItem ${color}`}
//                                   >
//                                     <input
//                                       type="radio"
//                                       name="color"
//                                       defaultValue={color}
//                                       id={`color_${color}`}
//                                     />
//                                     <label
//                                       htmlFor={`color_${color}`}
//                                       style={{ background: color }}
//                                     />
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                             <div className="pi01VSize">
//                               {product.sizes.map((size: any, idx: number) => (
//                                 <div key={idx} className="pi01VSItem">
//                                   <input
//                                     type="radio"
//                                     name="size"
//                                     defaultValue={size}
//                                     id={`size_${size}`}
//                                   />
//                                   <label htmlFor={`size_${size}`}>{size}</label>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductContent;
