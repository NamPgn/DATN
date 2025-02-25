import { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, Spin, Modal } from "antd";
import { useMutation, useQuery } from "react-query";
import { updateOrders } from "../../../../sevices/orders";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../../../sevices/users";
import UploadImage from "../../products/component/uploadImage";
import { UploadOutlined } from "@ant-design/icons";

const EditUser = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
	const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    isLoading,
    data: user,
    refetch,
  }: any = useQuery({
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
    const data = {
      id: id,
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
		<Button type="dashed" variant="solid" className="mb-3" icon={<UploadOutlined />} onClick={showModal}>
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
		<Card title={`Edit user: ${user?.name}`} bordered={false}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input type="text" placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select>
            <Select.Option value={"member"}>Member</Select.Option>
            <Select.Option value={"admin"}>Admin</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Card>
		</>
  );
};

export default EditUser;
