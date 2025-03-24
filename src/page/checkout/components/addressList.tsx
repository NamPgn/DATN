import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  deleteAddress,
  getAddressList,
  setAddressDefault,
  updateAddress,
} from "../../../sevices/client/orders";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import ModalEdit from "./modalEdit";
import { useCheckout } from "../../../context/checkout";

export default function AddressList({
  open,
  onClose,
  setDefaultAddress,
  closeModalAddress,
  openModalAddress,
  getAdressDefault,
  addList,
  MutateShipping,
  refetchAddrList,
  refetchDefault,
  setIsEdit,
}: any) {
  const [openModalEditState, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { checkoutItems } = useCheckout() || {};

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [selectedAddress, setSelectedAddress]: any = useState(null);
  const { mutate: mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await setAddressDefault(data);
    },
    onSuccess: () => {
      toast.success("Đã thêm địa chỉ mặc định");
      refetchDefault();
      onClose();
    },
    onError: () => {
      toast.error("Thêm địa chỉ mặc định thất bại");
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (data: any) => {
      return await deleteAddress(data);
    },
    onSuccess: () => {
      toast.success("Xóa địa chỉ thành công");
      refetchAddrList();
      setOpenConfirm(false);
    },
    onError: () => {
      toast.error("Xóa địa chỉ thất bại");
    },
  });
  const handleSelect = (address: any) => {
    setSelectedAddress(address);
  };
  useEffect(() => {
    if (getAdressDefault) {
      setSelectedAddress(getAdressDefault);
    }
  }, [getAdressDefault]);
  const handleConfirm = () => {
    if (selectedAddress) {
      setDefaultAddress(selectedAddress);
      mutate(selectedAddress?.id);
      MutateShipping({
        to_district_id: getAdressDefault.district,
        to_ward_code: getAdressDefault?.ward,
        weight: checkoutItems.reduce(
          (sum: number, item: any) => sum + item.weight * item.quantity,
          0
        ),
      });
    }
  };

  const handleOpenConfirm = (id: string) => {
    setSelectedAddressId(id);
    setOpenConfirm(true);
    setIsEdit(true);
  };

  const openModalEdit = () => setOpenModal(true);
  const closeModalEdit = () => setOpenModal(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedAddressId(null);
  };

  const handleEdit = (address: any) => {
    setEditData(address);
    setOpenModal(true);
  };

  const handleDelete = () => {
    if (getAdressDefault?.id !== selectedAddressId) {
      mutateDelete(selectedAddressId);
    } else {
      toast.error("Không được xóa địa chỉ mặc định");
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Chọn địa chỉ</Typography>
          <List>
            {addList.map((address: any) => (
              <>
                <ListItem
                  key={address.id}
                  component={"button"}
                  onClick={() => handleSelect(address)}
                >
                  <ListItemIcon>
                    <Checkbox checked={selectedAddress?.id === address.id} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${address.name} - ${address.phone}`}
                    secondary={`${address.address}`}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(address);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenConfirm(address.id);
                      }}
                    >
                      Xóa
                    </Button>
                  </Box>
                </ListItem>
              </>
            ))}
          </List>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleConfirm}
          >
            {isLoading ? "Chờ xác nhận..." : "Xác nhận"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={openModalAddress}
          >
            + Thêm địa chỉ mới
          </Button>
        </Box>
      </Modal>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa địa chỉ này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <ModalEdit
        open={openModalEditState}
        handleClose={closeModalEdit}
        data={editData}
        refetchAddrList={refetchAddrList}
        refetchDefault={refetchDefault}
      />
    </>
  );
}
