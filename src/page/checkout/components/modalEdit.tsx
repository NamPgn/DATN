import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getApiOrderAdress,
  postApiOrderDistrict,
  updateAddress,
} from "../../../sevices/client/orders";
import { toast } from "react-toastify";
import { UsersContext } from "../../../context/usersContext";
import { postApiOrderWard } from "../../../sevices/orders";

const ModalEdit = ({ open, handleClose, data, refetchAddrList }: any) => {
  const [selectedValuesAddr, setSelectedValuesAddr] = useState({
    o_name: "",
    o_email: "",
    o_address: "",
    o_phone: "",
  });
  const [selectedValues, setSelectedValues] = useState<any>({
    select1: { value: null, label: "" },
    select2: { value: null, label: "" },
    select3: { value: null, label: "" },
  });
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const { userId }: any = useContext(UsersContext) || {};
  useEffect(() => {
    if (data) {
      setSelectedValuesAddr({
        o_name: data?.name,
        o_email: data?.email,
        o_address: data?.address,
        o_phone: data?.phone,
      });
    }
  }, [data]);

  const { data: orderGetProvince } = useQuery(
    ["orderGetAdress"],
    async () => await getApiOrderAdress()
  );
  const optionsSelectProvince =
    orderGetProvince?.data?.data?.map((item: any) => ({
      label: item.ProvinceName,
      value: item.ProvinceID,
    })) || [];
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

  const { mutate: mutateEdit, isLoading: loadingEdit } = useMutation({
    mutationFn: async (data: any) => {
      return await updateAddress(data);
    },
    onSuccess: () => {
      toast.success("Thêm địa chỉ thành công");
      refetchAddrList();
      handleClose();
    },
    onError: () => {
      toast.error("Thêm địa chỉ thất bại");
    },
  });

  const handleConfirm = () => {
    const datas = {
      id: data?.id,
      user_id: userId?.id,
      name: selectedValuesAddr.o_name,
      email: selectedValuesAddr.o_email,
      phone: selectedValuesAddr.o_phone,
      address: selectedValuesAddr.o_address,
      province: selectedValues?.select1?.value,
      district: selectedValues?.select2?.value,
      ward: selectedValues?.select3.value.toString(),
      is_active: 1,
    };
    mutateEdit(datas);
  };

  const handleChange = (key: any, value: any) => {
    setSelectedValues((prev: any) => {
      let updatedValues = { ...prev };

      if (key === "select1") {
        const selectedOption = optionsSelectProvince.find(
          (opt: any) => opt.value === value
        );
        updatedValues = {
          select1: selectedOption,
          select2: { value: null, label: "" },
          select3: { value: null, label: "" },
        };
        MutateDistrict({ province_id: value });
      } else if (key === "select2") {
        const selectedOption = optionsDistrict.find(
          (opt: any) => opt.value === value
        );
        updatedValues = {
          ...prev,
          select2: selectedOption,
          select3: { value: null, label: "" },
        };
        MutateWard({ district_id: value });
      } else if (key === "select3") {
        const selectedOption: any = optionsWard.find(
          (opt: any) => opt.value === value
        );
        updatedValues = { ...prev, select3: selectedOption };
      }

      return updatedValues;
    });
  };
  const handleSetValue = (field: any, value: any) => {
    setSelectedValuesAddr((prev: any) => ({ ...prev, [field]: value }));
  };
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Sửa địa chỉ</DialogTitle>
      <DialogContent>
        <TextField
          label="Họ và Tên"
          fullWidth
          margin="dense"
          value={selectedValuesAddr.o_name || ""}
          onChange={(e) => handleSetValue("o_name", e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="dense"
          type="email"
          value={selectedValuesAddr.o_email || ""}
          onChange={(e) => handleSetValue("o_email", e.target.value)}
        />

        <TextField
          label="Số điện thoại"
          fullWidth
          margin="dense"
          value={selectedValuesAddr.o_phone || ""}
          onChange={(e) => handleSetValue("o_phone", e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel style={{ background: "#fff", padding: "0 5px" }}>
            Tỉnh/Thành
          </InputLabel>
          <Select
            value={selectedValues?.select1?.value || ""}
            onChange={(e) => handleChange("select1", e.target.value)}
          >
            {optionsSelectProvince?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          margin="dense"
          disabled={!selectedValues?.select1?.value}
        >
          <InputLabel style={{ background: "#fff", padding: "0 5px" }}>
            Quận/Huyện
          </InputLabel>
          <Select
            value={selectedValues?.select2?.value || ""}
            onChange={(e) => handleChange("select2", e.target.value)}
          >
            {optionsDistrict?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          margin="dense"
          disabled={!selectedValues?.select2?.value}
        >
          <InputLabel style={{ background: "#fff", padding: "0 5px" }}>
            Phường/Xã
          </InputLabel>
          <Select
            value={selectedValues?.select3?.value || ""}
            onChange={(e) => handleChange("select3", e.target.value)}
          >
            {optionsWard?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Địa chỉ cụ thể"
          fullWidth
          margin="dense"
          value={selectedValuesAddr.o_address || ""}
          onChange={(e) => handleSetValue("o_address", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          onClick={() => handleConfirm()}
          variant="contained"
          color="primary"
        >
          {loadingEdit ? "Chờ..." : "Xác nhận"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdit;
