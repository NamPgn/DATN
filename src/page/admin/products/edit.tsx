import { Form, message } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProduct, updateProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import { Link, useParams } from "react-router-dom";
import ProductForm from "./component/form";

const ProductEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [visible, setVisible] = useState(false);
  const [typeProduct, setTypeProduct] = useState("");
  const [dataEdit, setDataEdit]: any = useState(null);
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
    mutationFn: async (values: any) => await updateProduct(id, values),
    onSuccess: () =>{
      message.success("Sản phẩm đã được cập nhật thành công!")
      refetch();
    },
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
      <div className="d-flex">
        <UploadImage
          visible={visible}
          onClose={() => setVisible(false)}
          setSelectImage={setSelectImage}
          selectImage={selectImage}
          setSelectOneImage={setSelectOneImage}
          selectOneImage={selectOneImage}
          onCancel={() => setVisible(false)}
        />
        <div className="d-flex gap-3">
          <Link to={"/dashboard/add/product/variant/" + id}>
            Thêm biến thể mới
          </Link>
          <Link to={`/dashboard/product/${id}/variants/`}>QL Biến Thể</Link>
        </div>
      </div>

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
