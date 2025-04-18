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
import { useContext } from "react";
import { useMutation } from "react-query";
import { addAddress } from "../../../sevices/client/orders";
import { toast } from "react-toastify";
import { UsersContext } from "../../../context/usersContext";

const FormModal = ({
  open,
  handleClose,
  optionsSelectProvince,
  setSelectedValues,
  MutateDistrict,
  optionsDistrict,
  MutateWard,
  optionsWard,
  selectedValues,
  checkoutItems,
  MutateShipping,
  setValue,
  selectedValuesAddr,
  setSelectedValuesAddr,
  refetchAddrList,
  RefetchDefault,
  addList,
}: any) => {
  const { userId }: any = useContext(UsersContext) || {};

  const { mutate: mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await addAddress(data);
    },
    onSuccess: () => {
      toast.success("Thêm địa chỉ thành công");
      refetchAddrList();
      RefetchDefault();
      handleClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
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
        const selectedOption = optionsWard.find(
          (opt: any) => opt.value === value
        );
        updatedValues = { ...prev, select3: selectedOption };

        MutateShipping({
          to_district_id: selectedValues.select2.value,
          to_ward_code: selectedOption?.value,
          weight: checkoutItems.reduce(
            (sum: number, item: any) => sum + item.weight * item.quantity,
            0
          ),
        });
      }

      return updatedValues;
    });
  };
  const handleConfirm = () => {
    if (!selectedValuesAddr.o_name) {
      toast.error("Vui lòng nhập Họ và Tên");
      return;
    }
    if (!selectedValuesAddr.o_email) {
      toast.error("Vui lòng nhập Email");
      return;
    }
    if (!selectedValuesAddr.o_phone) {
      toast.error("Vui lòng nhập Số điện thoại");
      return;
    }
    if (!selectedValuesAddr.o_address) {
      toast.error(
        "Vui lòng nhập Địa chỉ cụ thể, phải có tên đường hoặc số nhà!"
      );
      return;
    }
    if (!selectedValues?.select1?.value) {
      toast.error("Vui lòng chọn Tỉnh/Thành");
      return;
    }
    if (!selectedValues?.select2?.value) {
      toast.error("Vui lòng chọn Quận/Huyện");
      return;
    }
    if (!selectedValues?.select3?.value) {
      toast.error("Vui lòng chọn Phường/Xã");
      return;
    }

    const data = {
      user_id: userId?.id,
      name: selectedValuesAddr.o_name,
      email: selectedValuesAddr.o_email,
      phone: selectedValuesAddr.o_phone,
      address:
        selectedValuesAddr.o_address +
        "," +
        ` ${selectedValues?.select3?.label}, ${selectedValues?.select2?.label}, ${selectedValues?.select1?.label}`,
      province: selectedValues?.select1?.value,
      district: selectedValues?.select2?.value,
      ward: selectedValues?.select3?.value?.toString(),
      is_active: 1,
    };

    setValue("o_name", selectedValuesAddr.o_name);
    setValue("o_mail", selectedValuesAddr.o_email);
    setValue(
      "address",
      selectedValuesAddr.o_address +
        "," +
        ` ${selectedValues?.select3?.label}, ${selectedValues?.select2?.label}, ${selectedValues?.select1?.label}`
    );
    setValue("o_phone", selectedValuesAddr.o_phone);

    mutate(data);
  };

  const handleSetValue = (field: any, value: any) => {
    setValue(field, value);

    setSelectedValuesAddr((prev: any) => ({ ...prev, [field]: value }));
  };
  return (
    <Dialog
      fullWidth
      open={open}
      disableEscapeKeyDown
      onClose={(_event, reason) => {
        if (
          (addList?.length === 0 && reason === "backdropClick") ||
          reason === "escapeKeyDown"
        ) {
          return;
        }
        handleClose();
      }}
    >
      <DialogTitle>Nhập Địa Chỉ Mới</DialogTitle>
      <DialogContent>
        <TextField
          label="Họ và Tên"
          fullWidth
          margin="dense"
          onChange={(e) => handleSetValue("o_name", e.target.value)}
        />

        {/* Nhập email */}
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          type="email"
          onChange={(e) => handleSetValue("o_email", e.target.value)}
        />

        <TextField
          label="Số điện thoại"
          fullWidth
          margin="dense"
          onChange={(e) => handleSetValue("o_phone", e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel style={{ background: "#fff", padding: "0 5px" }}>
            Tỉnh/Thành
          </InputLabel>
          <Select
            id="demo-simple-select-label"
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
            autoWidth
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
          onChange={(e) => handleSetValue("o_address", e.target.value)}
        />

      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Hủy</Button> */}
        <Button
          onClick={() => handleConfirm()}
          variant="contained"
          color="primary"
        >
          {isLoading ? "Chờ..." : "Xác nhận"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
