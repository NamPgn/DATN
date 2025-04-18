import { Modal } from "antd";

const DetailNote = ({ isModalVisible, handleCancel, modalDetails }: any) => {
  const renderValue = (key: string, value: any) => {
    if (!value) return "Không có thông tin";

    // Nếu value là link ảnh (.jpg, .png, .jpeg, .webp, .gif)
    if (typeof value === 'string' && value.match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <img src={value} alt={key} className="max-w-full max-h-60 mt-1 rounded" />
        </a>
      );
    }

    return value;
  };

  return (
    <Modal
      title="Chi tiết giao dịch"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      {modalDetails ? (
        <div className="space-y-2">
          {Object.entries(modalDetails).map(([key, value]: any) => (
            <div key={key}>
              <strong>{key}:</strong>{" "}
              {typeof value === "object" && value !== null ? (
                <div className="ml-4 space-y-1">
                  {Object.entries(value).map(([subKey, subValue]: any) => (
                    <div key={subKey}>
                      <strong>{subKey}:</strong> {renderValue(subKey, subValue)}
                    </div>
                  ))}
                </div>
              ) : (
                renderValue(key, value)
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>Không có chi tiết</div>
      )}
    </Modal>
  );
};

export default DetailNote;
