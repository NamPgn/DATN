import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAddressList } from "../../../sevices/client/orders";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";

export default function AddressList({
  open,
  onClose,
  setDefaultAddress,
  closeModalAddress,
  openModalAddress,
  getAdressDefault,
  addList,
}: any) {
  const [selectedAddress, setSelectedAddress]: any = useState(null);
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
      onClose();
    }
  };
  return (
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
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleConfirm}
        >
          Xác nhận
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
  );
}
