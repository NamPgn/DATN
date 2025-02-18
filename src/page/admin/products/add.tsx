import { Form, message } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAttributesAll } from "../../../sevices/attribute";
import { getCategorysAll } from "../../../sevices/category";
import { addProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import ProductForm from "./component/form";
import { PlusOutlined } from "@ant-design/icons";

const ProductAdd = () => {
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [visible, setVisible] = useState(false);
  const { isLoading, mutate: mutateCreate } = useMutation({
    mutationFn: async (values: any) => {
      return await addProduct(values);
    },
    onSuccess: () => message.success("Sản phẩm đã được tạo thành công!"),
    onError: () => message.error("Tạo sản phẩm thất bại!"),
  });

  return (
    <>
      <UploadImage
        visible={visible}
        onClose={() => setVisible(false)}
        setSelectImage={setSelectImage}
        selectImage={selectImage}
        setSelectOneImage={setSelectOneImage}
        selectOneImage={selectOneImage}
        onCancel={() => setVisible(false)}
      />
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
