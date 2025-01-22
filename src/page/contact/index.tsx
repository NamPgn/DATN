const ContactPage = () => {
  return (
    <>
      <section className="stayConnected">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="secTitle">Stay Connected</h2>
              <p className="secDesc">
                Showing our latest arrival on this summer
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6">
              <div className="contactItems">
                <div className="contactItem">
                  <span>
                    <i className="fa-solid fa-location-dot" />
                  </span>
                  <h5>Location</h5>
                  <p>20 Bordeshi, New York, Usa</p>
                </div>
                <div className="contactItem">
                  <span>
                    <i className="fa-solid fa-phone" />
                  </span>
                  <h5>Phone</h5>
                  <p>+123 456 789000</p>
                </div>
                <div className="contactItem">
                  <span>
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <h5>Email</h5>
                  <p>hello@ulina.com</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 offset-xl-2">
              <form
                action="#"
                method="post"
                className="contactForm"
                id="contact_form"
              >
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="required"
                      type="text"
                      name="conName"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="required"
                      type="email"
                      name="conEmail"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="required"
                      type="text"
                      name="conPhone"
                      placeholder="Your phone"
                    />
                  </div>
                  <div className="col-md-6">
                    <input type="text" name="conWeb" placeholder="Website" />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="required"
                      name="message"
                      placeholder="Write your message here"
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="ulinaBTN">
                      <span>Submit Now</span>
                    </button>
                    <div className="alert con_message" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119163.64578231794!2d105.60306624335935!3d21.038129800000032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1737554411223!5m2!1svi!2s"
          width={1300}
          height={450}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default ContactPage;
