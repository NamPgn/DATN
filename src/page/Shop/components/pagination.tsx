 const Paginations = ({ totalPages, currentPage, onPageChange }: any) => {
  return (
    <div className="row shopPaginationRow">
      <div className="col-lg-12 text-center">
        <div className="shopPagination">
          <div
            className={currentPage === 1 ? "disabled" : ""}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </div>

          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={currentPage === index + 1 ? "current" : ""}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </div>
          ))}

          <div
            className={currentPage === totalPages ? "disabled" : ""}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          >
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paginations