import { Modal, Checkbox, Input, Button } from "antd";
import { useState } from "react";
import { REASONS } from "../../../../constant";

const { TextArea } = Input;

const BlockAccountModal = ({ visible, onCancel, onSubmit }:any) => {


  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");

  const handleChange = (checkedValues: any) => {
    setSelectedReasons(checkedValues);
  };

  const handleSubmit = () => {
    const finalReasons = [...selectedReasons];
    if (otherReason.trim()) {
      finalReasons.push(otherReason);
    }
    onSubmit(finalReasons);
  };

  return (
    <Modal
      title="Khóa tài khoản"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Xác nhận
        </Button>,
      ]}
    >
      <Checkbox.Group value={selectedReasons} onChange={handleChange}>
        {REASONS?.map((reason) => (
          <Checkbox
            key={reason}
            value={reason}
            disabled={selectedReasons.length > 0 && !selectedReasons.includes(reason)}
          >
            {reason}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <div className="mt-4">
        <TextArea
          placeholder="Lý do khác..."
          value={otherReason}
          onChange={(e) => setOtherReason(e.target.value)}
          rows={3}
          disabled={selectedReasons.length > 0}
        />
      </div>
    </Modal>
  );
};

export default BlockAccountModal;
