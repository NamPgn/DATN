const reviews = [
  {
    id: 1,
    name: "John Manna",
    date: "June 10, 2022",
    content:
      "Desectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore ma na alihote pare ei gansh es gan quim veniam, quis nostr udg exercitation ullamco laboris nisi ut aliquip.",
    rating: 5,
    title: "Great product. Packaging was also good!",
    image: "/assets/images/author/7.jpg",
  },
  {
    id: 2,
    name: "Robert Thomas",
    date: "June 10, 2022",
    content:
      "Desectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore ma na alihote pare ei gansh es gan quim veniam, quis nostr udg exercitation ullamco laboris nisi ut aliquip.",
    rating: 4,
    title: "The item is very comfortable and soft!",
    image: "/assets/images/author/8.jpg",
  },
  {
    id: 3,
    name: "Ken Williams",
    date: "June 10, 2022",
    content:
      "Desectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore ma na alihote pare ei gansh es gan quim veniam, quis nostr udg exercitation ullamco laboris nisi ut aliquip.",
    rating: 5,
    title: "I liked the product, it is awesome.",
    image: "/assets/images/author/9.jpg",
  },
];
const Description = ({
  product,
  handleInputChange,
  handleRatingChange,
  formData,
}: any) => {
  return (
    <div className="row productContentRow">
      <div className="productOpenTab">
        <h4 className="potTitle">Description</h4>
        <div className="productDescContentArea">
          <div className="row">
            <div className="col-lg-6">
              <div className="descriptionContent">
                <h3>Product Details</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="productOpenTab">
        <h4 className="potTitle">Reviews</h4>
        <div className="productReviewArea">
          <div className="row">
            <div className="col-lg-6">
              <h3>{reviews.length} Reviews</h3>
              <div className="reviewList">
                <ol>
                  {reviews.map((review) => (
                    <li key={review.id}>
                      <div className="postReview">
                        <img src={review.image} alt="Post Review" />
                        <h2>{review.title}</h2>
                        <div className="postReviewContent">
                          {review.content}
                        </div>
                        <div className="productRatingWrap">
                          <div className="star-rating">
                            {[...Array(review.rating)].map((_, index) => (
                              <span key={index} className="filled-star">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="reviewMeta">
                          <h4>{review.name}</h4>
                          <span>on {review.date}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="commentFormArea">
                <h3>Add A Review</h3>
                <div className="reviewFrom">
                  <form method="post" action="#" className="row">
                    <div className="col-lg-12">
                      <div className="reviewStar">
                        <label>Your Rating</label>
                        <div className="rsStars">
                          {[...Array(5)].map((_, index) => (
                            <i
                              key={index}
                              className={`fa-regular fa-star ${
                                formData.rating > index ? "selected" : ""
                              }`}
                              onClick={() => handleRatingChange(index + 1)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="title"
                        placeholder="Review title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        name="comment"
                        placeholder="Write your review here"
                        value={formData.comment}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="ulinaBTN">
                        <span>Submit Now</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
