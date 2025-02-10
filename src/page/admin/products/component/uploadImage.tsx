import { SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Image, List, message, Modal, Tabs, Upload } from "antd";
import React, { memo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { addImageList, getImageLists } from "../../../../sevices/imageList";

const UploadImage = memo(
  ({
    visible,
    setSelectImage,
    selectImage,
    setSelectOneImage,
    selectOneImage,
    onCancel,
  }: any) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [page, setPage] = useState(1);
    const { data: images, refetch }: any = useQuery(
      ["imageList", page],
      async () => (await getImageLists(page)).data,
      {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      }
    );

    const handleFileChange = ({ fileList }: any) => {
      setFileList(fileList);
    };

    const { isLoading, mutate } = useMutation({
      mutationFn: async (values: any) => {
        return await addImageList(values);
      },
      onSuccess: () => {
        message.success("Ảnh đã được tải lên thành công!");
        refetch();
      },
      onError: () => {
        message.error("Lỗi khi tải ảnh lên!");
      },
    });

    const handleSelectImage = (image: any) => {
      setSelectImage((prevSelected: any) =>
        prevSelected.some((img: any) => img.id === image.id)
          ? prevSelected.filter((img: any) => img.id !== image.id)
          : [...prevSelected, image]
      );
    };

    const handleSelectMainImage = (image: any) => {
      setSelectOneImage(image);
    };

    const handleSubmit = () => {
      if (fileList.length === 0) {
        message.error("Vui lòng chọn ít nhất một ảnh để tải lên!");
        return;
      }
      const formData = new FormData();
      fileList.forEach((file: any) => {
        formData.append("images[]", file.originFileObj);
      });
      mutate(formData);
    };

    return (
      <Modal
        title="Quản lý hình ảnh"
        open={visible}
        onCancel={onCancel}
        footer={null}
        width={800}
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
                  loading={isLoading}
                  htmlType="submit"
                  block
                >
                  Upload Images
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Image List" key="2">
            <List
              grid={{ gutter: 10, column: 5 }}
              dataSource={images}
              renderItem={(item: any) => {
                const isSelected = selectImage.some(
                  (img: any) => img.id === item.id
                );

                const isMainImage = selectOneImage?.id == item.id;
                return (
                  <List.Item>
                    <div
                      className={`relative cursor-pointer border-2 ${
                        isSelected ? "border-green-500" : "border-transparent"
                      }`}
                      onClick={() => handleSelectImage(item)}
                    >
                      <Image
                        src={item.url}
                        style={{
                          border: isSelected ? "2px solid green" : "",
                          opacity: isMainImage ? 0.6 : 1,
                        }}
                        className="object-fit-cover"
                        alt="uploaded"
                        width={100}
                        height={100}
                        preview={false}
                      />
                    </div>
                    <Button
                      size="small"
                      type={isMainImage ? "primary" : "default"}
                      style={{ marginTop: 5 }}
                      onClick={() => handleSelectMainImage(item)}
                    >
                      {isMainImage ? "Ảnh Chính" : "Chọn Ảnh Chính"}
                    </Button>
                  </List.Item>
                );
              }}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
);

export default UploadImage;
