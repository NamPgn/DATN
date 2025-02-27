const AboutSection03 = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Lê Văn Thành",
      role: "Founder & CEO",
      image: "/assets/images/ceo/986ca0d7-2b80-42cd-ba0d-e4c37220b49c.jpg",
      socials: ["fa-facebook-f", "fa-twitter", "fa-linkedin-in"],
    },
    {
      id: 2,
      name: "Phương Minh Hoàng",
      role: "CTO",
      image: "/assets/images/ceo/16dfbfd4-5e5f-4b12-8f62-572d860d03fd.jpg",
      socials: ["fa-facebook-f", "fa-twitter"],
    },
    // {
    //   id: 3,
    //   name: "Phương Minh Hoàng",
    //   role: "CTO",
    //   image: "/assets/images/ceo/2.jpg",
    //   socials: ["fa-facebook-f", "fa-twitter"],
    // },
    // {
    //   id: 4,
    //   name: "Nguyễn Hải Lâm",
    //   role: "CTO",
    //   image: "/assets/images/ceo/2.jpg",
    //   socials: ["fa-facebook-f", "fa-twitter"],
    // },
    // {
    //   id: 5,
    //   name: "Thiện",
    //   role: "CTO",
    //   image: "/assets/images/ceo/2.jpg",
    //   socials: ["fa-facebook-f", "fa-twitter"],
    // },
    // {
    //   id: 7,
    //   name: "Dương Tú",
    //   role: "CTO",
    //   image: "/assets/images/ceo/2.jpg",
    //   socials: ["fa-facebook-f", "fa-twitter"],
    // },
    {
      id: 6,
      name: "Phạm Giang Nam",
      role: "Lead Designer",
      image: "/assets/images/ceo/cc07785f-d7b6-49f5-8a91-97fa8f9b7bf7.jpg",
      socials: ["fa-facebook-f", "fa-linkedin-in"],
    },
  ];
  return (
    <section className="aboutPageSection03">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="secTitle">Team Members</h2>
            <p className="secDesc">Showing our latest arrival on this summer</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="teamCarousel owl-carousel owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div
                  style={{
                    transform: "translate3d(0px, 0px, 0px)",
                    transition: "all",
                    width: 3960,
                  }}
                >
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="owl-item active"
                      style={{ width: 306, marginRight: 24, height: 400 }}
                    >
                      <div className="teamMember01" style={{ height: "100%" }}>
                        <img
                          style={{ height: "100%", objectFit: "cover" }}
                          src={member.image}
                          alt={member.name}
                        />
                        <div className="tm01Info">
                          <h3>{member.name}</h3>
                          <span>{member.role}</span>
                        </div>
                        <div className="tm01Social">
                          {member.socials.map((icon, index) => (
                            <a key={index} href="#">
                              <i className={`fa-brands ${icon}`} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="owl-nav">
                <button
                  type="button"
                  role="presentation"
                  className="owl-prev disabled"
                >
                  <i className="fa-solid fa-angle-left" />
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <i className="fa-solid fa-angle-right" />
                </button>
              </div>
              <div className="owl-dots disabled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection03;
