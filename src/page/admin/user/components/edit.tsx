import { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, Spin, Modal } from "antd";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../../../sevices/users";
import UploadImage from "../../products/component/uploadImage";
import { UploadOutlined } from "@ant-design/icons";

const EditUser = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectImage, setSelectImage]: any = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoading, data: user }: any = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      return (await getUser(id)).data;
    },
  });
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await updateUser(data);
    },
    onSuccess: () => {
      toast.success("Sửa thành công");
    },
    onError: () => {
      toast.error("Sửa không thành công");
    },
  });
  const onFinish = (values: any) => {
    console.log(selectImage[0]?.id);
    const data = {
      id: id,
      avatar: selectImage[0]?.id,
      ...values,
    };
    mutate(data);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (isLoading) {
    return <Spin />;
  }
  return (
    <>
      {/* <Button
        type="dashed"
        variant="solid"
        className="mb-3"
        icon={<UploadOutlined />}
        onClick={showModal}
      >
        Tải ảnh lên
      </Button>

      <Modal
        width={800}
        title="Tải ảnh lên"
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
      </Modal> */}
      <Card title={`Sửa tài khoản: ${user?.name}`} bordered={false}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input type="text" placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
          >
            <Select placeholder="Chọn quyền">
              <Select.Option value="member">Thành viên</Select.Option>
              <Select.Option value="admin">Quản trị viên</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default EditUser;
