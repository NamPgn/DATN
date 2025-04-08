import { Button, Form, message, Modal } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProduct, updateProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import { Link, useParams } from "react-router-dom";
import ProductForm from "./component/form";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";

const ProductEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [visible, setVisible] = useState(false);

  const [_typeProduct, setTypeProduct] = useState("");
  const [_dataEdit, setDataEdit]: any = useState(null);
  const { data: product, refetch } = useQuery(
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
        setTypeProduct(data.type);
        setDataEdit(data);
      },
    }
  );

  const { mutate: mutateEdit } = useMutation({
    mutationFn: async (values: any) =>
      await updateProduct({
        id: id,
        values,
      }),
    onSuccess: () => {
      message.success("Sản phẩm đã được cập nhật thành công!");
      refetch();
    },
    onError: () => {
      message.error("Cập nhật sản phẩm thất bại!")
    },
  });

  return (
    <TailwindComponent>
      <div className="flex justify-between ">
        <Button
          type="dashed"
          variant="solid"
          className="mb-3"
          icon={<UploadOutlined />}
          onClick={() => setVisible(true)}
        >
          Tải ảnh lên
        </Button>
        <div className="d-flex gap-3  ">
          <Link to={"/dashboard/add/product/variant/" + id}>
            Thêm biến thể mới
          </Link>
          <Link to={`/dashboard/product/${id}/variants/`}>QL Biến Thể</Link>
        </div>
      </div>
      <Modal
        width={800}
        title="Tải ảnh lên"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <UploadImage
          setSelectImage={setSelectImage}
          selectImage={selectImage}
          setSelectOneImage={setSelectOneImage}
          selectOneImage={selectOneImage}
        />
      </Modal>
      <ProductForm
        dataEdit={product}
        selectOneImage={selectOneImage}
        selectImage={selectImage}
        mutateUpdate={mutateEdit}
      />
    </TailwindComponent>
  );
};

export default ProductEdit;
