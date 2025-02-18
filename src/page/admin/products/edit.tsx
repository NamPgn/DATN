import { Button, Form, Input, InputNumber, message, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAttributesAll } from "../../../sevices/attribute";
import { getCategorysAll } from "../../../sevices/category";
import { getProduct, updateProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import ProductForm from "./component/form";

const ProductEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [typeProduct, setTypeProduct] = useState("");
  const [dataEdit, setDataEdit]: any = useState(null);
  const [initialData, setInitialData] = useState<any>(null);
  const { data: product } = useQuery(
    ["product", id],
    async () => (await getProduct(id)).data,
    {
      enabled: !!id,
      onSuccess: (data) => {
        form.setFieldsValue({ ...data });
        setSelectOneImage({
          id: data.main_image,
        });
        setSelectImage(
          data?.product_images.map((item: any) => {
            return {
              id: item.public_id,
              url: item.url,
            };
          })
        );
        setVariants(data?.variants);
        setTypeProduct(data.type);
        setDataEdit(data);
      },
    }
  );

  useEffect(() => {
    setTimeout(() => {
      if (typeProduct == dataEdit?.type) {
        form.resetFields();
        form.setFieldsValue({
          ...initialData,
        });
      } else {
        form.resetFields(["variants"]);
        setVariants([]);
        form.setFieldsValue({
          regular_price: dataEdit?.regular_price || 0,
          sale_price: dataEdit?.sale_price || 0,
          stock_quantity: dataEdit?.stock_quantity || 0,
          sku: dataEdit?.sku || "",
        });
      }
    }, 100);
  }, [typeProduct]);

  const { mutate: mutateEdit } = useMutation({
    mutationFn: async (values: any) => await updateProduct(id, values),
    onSuccess: () => message.success("Sản phẩm đã được cập nhật thành công!"),
    onError: () => message.error("Cập nhật sản phẩm thất bại!"),
  });

  return (
    <>
      {/* <div
        className="d-flex flex-column align-items-center justify-content-center border border-secondary border-dashed rounded p-3"
        style={{ width: "120px", height: "120px", cursor: "pointer" }}
        onClick={() => setVisible(true)}
      >
        <PlusOutlined className="text-4xl text-gray-500 hover:text-blue-500" />
        <span className="text-muted">Upload</span>
      </div> */}
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
        dataEdit={product}
        selectOneImage={selectOneImage}
        selectImage={selectImage}
        mutateUpdate={mutateEdit}
      />
    </>
  );
};

export default ProductEdit;
