import { Form, Button, message, Upload } from "antd";
import { useMutation } from "react-query";
import { SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { addImageList } from "../../../../sevices/imageList";

const AddImageProducts = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await addImageList(values);
    },
    onSuccess: () => {
      message.success("AttributeValue created successfully!");
    },
    onError: () => {
      message.error("AttributeValue created failure!");
    },
  });
  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleSubmit = (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one file!");
      return;
    }
    const formData: any = new FormData();
    fileList.forEach((file: any) => {
      formData.append("images[]", file.originFileObj);
    });
    mutate(formData);
  };
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Upload Files">
        <Upload
          name="images"
          multiple
          listType="picture"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleFileChange}
        >
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
        >
          Create AttributeValue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddImageProducts;
