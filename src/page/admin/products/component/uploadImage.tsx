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
      <Tabs>
        <Tabs.TabPane tab="Chọn ảnh từ thư viện" key="2">
          <List
            className="w-50"
            grid={{ column: 3 }}
            dataSource={images}
            renderItem={(item: any) => {
              const isSelected = selectImage.some(
                (img: any) => img.id === item.id
              );
              const isMainImage = selectOneImage?.id === item.id;
              return (
                <List.Item>
                  <div
                    className={`position-relative cursor-pointer ${
                      isSelected ? "border-success" : "border-secondary"
                    } p-2`}
                    onClick={() => handleSelectImage(item)}
                  >
                    <img
                      src={item.url}
                      className="img-fluid"
                      style={{
                        border: isSelected ? "2px solid green" : "",
                        opacity: isMainImage ? 0.6 : 1,
                      }}
                      alt="uploaded"
                    />
                    {/* Ô Checkbox chọn ảnh chính */}
                    <div className="position-absolute top-0 p-1 m-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isMainImage}
                        onChange={() => handleSelectMainImage(item)}
                      />
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Tải ảnh lên" key="1">
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
                <Button>
                  <UploadOutlined /> Select Files
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button style={{ background:"#0d6efd" }} htmlType="submit" disabled={isLoading}>
                Upload Images
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    );
  }
);

export default UploadImage;
