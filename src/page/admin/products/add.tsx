/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { addProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import ProductForm from "./component/form";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const ProductAdd = () => {
  const navigate = useNavigate();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoading, mutate: mutateCreate } = useMutation({
    mutationFn: async (values: any) => {
      return await addProduct(values);
    },
    onSuccess: () => {
      message.success("Sản phẩm đã được tạo thành công!");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 800);
    },
    onError: () => {
      message.error("Tạo sản phẩm thất bại!");
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button
        type="dashed"
        variant="solid"
        className="mb-3"
        icon={<UploadOutlined />}
        onClick={showModal}
      >
        Upload Image
      </Button>

      <Modal
        width={800}
        title="Upload Image"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UploadImage
          setSelectImage={setSelectImage}
          selectImage={selectImage}
          setSelectOneImage={setSelectOneImage}
          selectOneImage={selectOneImage}
        />
      </Modal>
      <ProductForm
        selectOneImage={selectOneImage}
        selectImage={selectImage}
        mutateCreate={mutateCreate}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductAdd;
