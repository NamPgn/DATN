const Loading = () => {
  return (
    <div className="d-flex justify-content-center" style={{ height:'100vh' }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
