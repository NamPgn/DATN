import { Form, Input, Button, Card, Select, Spin } from "antd";
import { useMutation, useQuery } from "react-query";
import {
  addOrders,
  getApiOrderAdress,
  postApiOrderDistrict,
  postApiOrderGetShip,
  postApiOrderWard,
} from "../../../../sevices/orders";
import { toast } from "react-toastify";
import { useState } from "react";
import ProductSelect from "./selectProducts";
import TextArea from "antd/es/input/TextArea";
interface Product {
  id: number;
  name: string;
  image: string;
  variants: { id: number; name: string }[];
}
const AddOrder = () => {
  const [form] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [selectedValues, setSelectedValues] = useState<any>({
    select1: { value: null, label: "" },
    select2: { value: null, label: "" },
    select3: { value: null, label: "" },
  });
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const [optionsShip, setOptionsShip]: any = useState({});
  const { data: orderGetProvince, isLoading } = useQuery(
    ["orderGetAdress"],
    async () => await getApiOrderAdress()
  );

  const { mutate: MutateDistrict, isLoading: loadingDistrict } = useMutation({
    mutationFn: async (data: any) => {
      return (await postApiOrderDistrict(data)).data;
    },
    onSuccess: (data) => {
      setOptionsDistrict(
        data?.data?.map((item: any) => ({
          key: `district-${item.DistrictID}`,
          label: item.DistrictName,
          value: item.DistrictID,
        })) || []
      );
      setOptionsWard([]);
      //   toast.success("Tải danh sách quận thành công");
    },
    onError: () => {
      toast.error("Lỗi tải danh sách quận");
    },
  });

  const { mutate: MutateWard, isLoading: loadingWard } = useMutation({
    mutationFn: async (data: any) => {
      return (await postApiOrderWard(data)).data;
    },
    onSuccess: (data) => {
      setOptionsWard(
        data?.data?.map((item: any) => ({
          key: `ward-${item.WardCode}`,
          label: item.WardName,
          value: item.WardCode,
        })) || []
      );
      //   toast.success("Tải danh sách phường thành công");
    },
    onError: () => {
      toast.error("Lỗi tải danh sách phường");
    },
  });

  const { mutate: MutateShipping } = useMutation({
    mutationFn: async (data: any) => {
      return (await postApiOrderGetShip(data)).data;
    },
    onSuccess: (data) => {
      setOptionsShip(data);
    },
    onError: () => {
      toast.error("Lỗi tải danh sách giao hàng");
    },
  });

  const { mutate: Mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await addOrders(data);
    },
    onSuccess: () => {
      toast.success("Thêm order thành công");
    },
    onError: () => {
      toast.error("Lỗi tải danh sách giao hàng");
    },
  });

  const optionsSelectProvince =
    orderGetProvince?.data?.data?.map((item: any) => ({
      label: item.ProvinceName,
      value: item.ProvinceID,
    })) || [];

  const handleChange = (key: "select1" | "select2" | "select3", value: any) => {
    let selectedOption: any = {};

    if (key === "select1") {
      selectedOption = optionsSelectProvince.find(
        (opt: any) => opt.value === value
      );
      setSelectedValues({
        select1: selectedOption,
        select2: null,
        select3: null,
      });
      MutateDistrict({ province_id: value });
    } else if (key === "select2") {
      selectedOption = optionsDistrict.find((opt: any) => opt.value === value);
      setSelectedValues((prev: any) => ({
        ...prev,
        select2: selectedOption,
        select3: null,
      }));
      MutateWard({ district_id: value });
    } else if (key === "select3") {
      selectedOption = optionsWard.find((opt: any) => opt.value === value);
      setSelectedValues((prev: any) => ({ ...prev, select3: selectedOption }));
      MutateShipping({
        to_district_id: selectedValues.select2.value,
        to_ward_code: selectedOption.value,
        weight: selectedProducts.reduce(
          (sum: number, item: any) => sum + item.weight * item.quantity,
          0
        ),
      });
    }
  };

  const onFinish = (values: any) => {
    const totalAmount = selectedProducts.reduce(
      (sum: number, item: any) => sum + (item.regular_price || 0),
      0
    );
    const data = {
      ...values,
      o_address:
        values.o_address +  
        ` ${selectedValues.select1.label} - ${selectedValues.select2.label} - ${selectedValues.select3.label}`,
      discount_amount: 0,
      final_amount: 0,
      products: selectedProducts,
      shipping: optionsShip.fee,
      time: optionsShip.time,
      total_amount: totalAmount,
    };
    Mutate(data);
  };
  if (isLoading) return <Spin />;
  return (
    <Card bordered={false}>
      <ProductSelect
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
      />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Chọn Tỉnh/Thành phố" name="province_id">
          <Select
            style={{ width: "200px" }}
            placeholder="Chọn Tỉnh/Thành phố"
            options={optionsSelectProvince}
            onChange={(value) => handleChange("select1", value)}
          />
        </Form.Item>

        <Form.Item label="Chọn Quận/Huyện" name="district_id">
          <Select
            style={{ width: "200px" }}
            placeholder="Chọn Quận/Huyện"
            options={optionsDistrict}
            onChange={(value) => handleChange("select2", value)}
            disabled={!selectedValues.select1}
            loading={loadingDistrict}
          />
        </Form.Item>

        <Form.Item label="Chọn Phường/Xã" name="ward_id">
          <Select
            style={{ width: "200px" }}
            placeholder="Chọn Phường/Xã"
            options={optionsWard}
            onChange={(value) => handleChange("select3", value)}
            disabled={!selectedValues.select2}
            loading={loadingWard}
          />
        </Form.Item>

        {selectedValues?.select1?.value &&
          selectedValues?.select2?.value &&
          selectedValues?.select3?.value && (
            <Form.Item label="Địa chỉ">
              <Input
                style={{ width: "600px" }}
                value={`${selectedValues.select1.label} - ${selectedValues.select2.label} - ${selectedValues.select3.label}`}
                disabled
              />
            </Form.Item>
          )}

        <Form.Item
          label="Địa chỉ cụ thể"
          name="o_address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input placeholder="Địa chỉ cụ thể" style={{ width: "600px" }} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="o_phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" style={{ width: "600px" }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="o_mail"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Email" style={{ width: "600px" }} />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="o_name"
          rules={[
            { required: true, message: "Vui lòng nhập tên!" },
            { min: 2, message: "Tên phải có ít nhất 2 ký tự!" },
          ]}
        >
          <Input placeholder="Tên" style={{ width: "600px" }} />
        </Form.Item>

        <Form.Item
          label="Nhập Vorcher"
          name="vorcher"
          rules={[
            { required: true, message: "Vui lòng nhập vorcher!" },
            { min: 2, message: "Vorcher phải có ít nhất 2 ký tự!" },
          ]}
        >
          <Input placeholder="ABC123" style={{ width: "600px" }} />
        </Form.Item>
        <Form.Item
          label="Ghi chú"
          name="note"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <TextArea placeholder="Ghi chú" style={{ width: "600px" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Card>
  );
};

export default AddOrder;
