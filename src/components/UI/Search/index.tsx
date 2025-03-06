import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchUi = ({
  onOpen,
  onClose,
}: {
  onOpen: boolean;
  onClose: (value: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      onClose(false);
    }
  };
  return (
    <section
      className={onOpen ? "popup_search_sec active" : "popup_search_sec"}
    >
      <div className="popup_search_overlay" onClick={() => onClose(false)} />
      <div className="pop_search_background">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="popup_logo">
                <a href="index.html">
                  <img src="/assets/images/logo2.png" alt="Ulina" />
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div
                className="search_Closer"
                style={{ cursor: "pointer" }}
                onClick={() => onClose(false)}
              ></div>
            </div>
          </div>
        </div>
        <div className="middle_search">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="popup_search_form">
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      name="s"
                      id="s"
                      placeholder="Search..."
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fa-solid fa-search" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchUi;
