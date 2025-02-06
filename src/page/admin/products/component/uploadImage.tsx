import { SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, List, message, Modal, Tabs, Upload } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { addAttributesVal } from "../../../../sevices/attributeValue";
import { addImageList, getImageLists } from "../../../../sevices/imageList";

const UploadImage = ({
  visible,
  onClose,
  setSelectImage,
  selectImage,
  onCancel,
}: any) => {
  const [form] = Form.useForm();
  const [page, setPage]: any = useState(1);
  const [fileList, setFileList] = useState([]);

  const { data: images, refetch }: any = useQuery({
    queryKey: ["imageList", page],
    queryFn: async () => (await getImageLists(page)).data?.data,
  });
  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  const { isLoading, mutate } = useMutation({
    mutationFn: async (values: any) => {
      return await addImageList(values);
    },
    onSuccess: () => {
      message.success("AttributeValue created successfully!");
    },
    onError: () => {
      message.error("AttributeValue created failure!");
    },
  });

  const handleSelectImage = (imageId: string) => {
    setSelectImage(
      (prevSelected: any) =>
        prevSelected.includes(imageId)
          ? prevSelected.filter((id: any) => id !== imageId) // Bỏ chọn
          : [...prevSelected, imageId] // Thêm vào danh sách
    );
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
    <Modal
      title="Quản lý hình ảnh"
      open={visible}
      onClose={onClose}
      onCancel={onCancel}
      footer={null}
      width={1500}
    >
      <Tabs>
        <Tabs.TabPane tab="Upload Image" key="1">
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
                block
              >
                Create AttributeValue
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Image List" key="2">
          <List
            grid={{ gutter: 1, column: 10 }}
            dataSource={images}
            renderItem={(item: any) => {
              const isSelected = selectImage.includes(item.id);
              return (
                <List.Item>
                  <div
                    className={`relative cursor-pointer border-2 ${
                      isSelected ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => handleSelectImage(item.id)}
                  >
                    <Image
                      src={item.url}
                      style={{
                        border: `${isSelected ? "2px solid blue" : ""}`,
                      }}
                      className="object-fit-cover"
                      alt="uploaded"
                      width={100}
                      height={100}
                      preview={false}
                    />
                  </div>
                </List.Item>
              );
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default UploadImage;
