import { Link } from "react-router-dom";

const FofPage = () => {
  return (
    <section className="fofPage">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fofContent text-center">
              <h2>404</h2>
              <h3>
                <i className="fa-regular fa-face-sad-cry" /> Oops! Page not
                found.
              </h3>
              <p>
                The page you are looking for was moved removed, renamed or never
                existed
              </p>
              <Link to="/" className="ulinaBTN">
                <span>Back To Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FofPage;
