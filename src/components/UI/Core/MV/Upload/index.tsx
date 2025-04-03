import { Upload } from "antd";
import { memo } from "react";
import { Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import MVText from "../Text";
import { MyButton } from "../../Button";

export const MVUpload = memo(({ label, name, control }: any) => {
  return (
    <div className="mt-2">
      <div>
        <MVText htmlFor={name}>{label + ": "}</MVText>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Upload
            name={name}
            beforeUpload={() => false}
            onChange={(info) => {
              const fileList = info.fileList.slice(-1); // Chỉ lấy file cuối cùng trong danh sách
              field.onChange(fileList[0]?.originFileObj); // Truyền dữ liệu file thực tế vào field
            }}
          >
            <MyButton icon={<UploadOutlined />} className="my-2">
              Click to Upload
            </MyButton>
          </Upload>
        )}
      />
    </div>
  );
});

export default MVUpload;
