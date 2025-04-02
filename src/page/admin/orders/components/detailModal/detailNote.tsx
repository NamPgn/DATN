import { Modal } from "antd";

const DetailNote = ({ isModalVisible, handleCancel, modalDetails }: any) => {
  return (
    <Modal
      title="Chi tiết giao dịch"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      {modalDetails ? (
        <div>
          {Object.entries(modalDetails).map(([key, value]: any) => (
            <div key={key}>
              <strong>{key}:</strong> {value || "Không có thông tin"}
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
