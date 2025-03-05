import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchUi = (props: {
  onOpen: boolean;
  onClose: (state: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };
  return (
    <section
      className={
        props.onOpen == true ? " popup_search_sec active " : "popup_search_sec"
      }
    >
      <div
        className="popup_search_overlay"
        onClick={() => props.onClose(false)}
      />
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
                onClick={() => props.onClose(false)}
              ></div>
            </div>
          </div>
        </div>
        <div className="middle_search">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="popup_search_form">
                  <form onSubmit={handleSearch}>
                    <input
                      type="search"
                      name="s"
                      id="s"
                      placeholder="Nhập từ khóa tìm kiếm..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
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
