import { useState } from "react";

const AboutSection03 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Số item hiển thị trên mỗi trang

  const teamMembers = [
    {
      id: 1,
      name: "Lê Văn Thành",
      role: "Trưởng buồng",
      image: "/assets/images/ceo/986ca0d7-2b80-42cd-ba0d-e4c37220b49c.jpg",
      socials: ["fa-facebook-f", "fa-twitter", "fa-linkedin-in"],
    },
    {
      id: 2,
      name: "Phương Minh Hoàng",
      role: "Mâm 1",
      image: "/assets/images/ceo/16dfbfd4-5e5f-4b12-8f62-572d860d03fd.jpg",
      socials: ["fa-facebook-f", "fa-twitter"],
    },
    {
      id: 6,
      name: "Phạm Giang Nam",
      role: "Trật tự buồng",
      image: "/assets/images/ceo/cc07785f-d7b6-49f5-8a91-97fa8f9b7bf7.jpg",
      socials: ["fa-facebook-f", "fa-linkedin-in"],
    },
    {
      id: 7,
      name: "Nguyễn Hải Lâm",
      role: "Mâm 2",
      image: "/assets/images/ceo/6175c13c-cc3c-4c8f-85d4-1e327f60b4df.jpg",
      socials: ["fa-facebook-f", "fa-linkedin-in"],
    },
    {
      id: 8,
      name: "Dương Minh Tú",
      role: "Mâm 2",
      image: "/assets/images/ceo/0dc8a1f0-1500-4d29-8fb1-258bc1010213.jpg",
      socials: ["fa-facebook-f", "fa-linkedin-in"],
    },
    {
      id: 9,
      name: "Trần Đức Hưng",
      role: "Mâm 3 ông vua nhà mép",
      image: "assets/images/ceo/Screenshot 2025-04-16 194630.png",
      socials: ["fa-facebook-f", "fa-linkedin-in"],
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, teamMembers.length - itemsPerPage)
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= teamMembers.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const visibleMembers = teamMembers.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="aboutPageSection03">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="secTitle">Thành viên </h2>
            <p className="secDesc">Tất cả thành viên</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="teamRow row">
              {teamMembers.slice(0, 7).map((member) => (
                <div
                  key={member.id}
                  className="col-md-3 mb-4"
                  style={{ height: 400 }}
                >
                  <div className="teamMember01" style={{ height: "100%" }}>
                    <img
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
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

            <div className="teamRow row">
              {teamMembers.slice(7).map((member) => (
                <div
                  key={member.id}
                  className="col-md-3 mb-4"
                  style={{ height: 400 }}
                >
                  <div className="teamMember01" style={{ height: "100%" }}>
                    <img
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection03;
