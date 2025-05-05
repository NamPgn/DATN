const Paginations = ({ totalPages, currentPage, onPageChange }: any) => {
  if (totalPages <= 1) return null; // Không hiện phân trang nếu chỉ có 1 trang

  return (
    <div className="row shopPaginationRow">
      <div className="col-lg-12 text-center">
        <div className="shopPagination">
          {/* Previous Button */}
          <div
            className={`pagination-arrow ${
              currentPage === 1 ? "disabled" : ""
            }`}
            role="button"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
          </div>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <div
                key={page}
                className={`pagination-number ${
                  currentPage === page ? "current" : ""
                }`}
                role="button"
                onClick={() => onPageChange(page)}
              >
                {page}
              </div>
            );
          })}

          {/* Next Button */}
          <div
            className={`pagination-arrow ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            role="button"
            aria-disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paginations;
