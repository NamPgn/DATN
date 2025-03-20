import { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddressList from "./addressList";

export default function AddressDisplay({
  openModalAddress,
  closeModalAddress,
  getAdressDefault,
  addList,
}: any) {
  const [open, setOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    if (getAdressDefault) {
      setDefaultAddress(getAdressDefault);
    }
  }, [getAdressDefault]);
  return (
    <div className="container mt-5">
      <Box
        sx={{
          border: "2px dashed #e57373",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          width: 800,
        }}
      >
        <LocationOnIcon sx={{ mr: 1 }} />
        <Typography sx={{ fontWeight: "bold" }}>Địa Chỉ Nhận Hàng</Typography>
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Typography>
            <strong>{defaultAddress?.name}</strong> ({defaultAddress?.phone}){" "}
            {defaultAddress?.address}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              border: "1px solid red",
              color: "red",
              fontSize: 12,
              padding: "2px 5px",
              borderRadius: 1,
              mr: 2,
            }}
          >
            Mặc Định
          </Box>
          <Button
            onClick={() => setOpen(true)}
            sx={{ color: "blue", textTransform: "none" }}
          >
            Thay Đổi
          </Button>
        </Box>

        <AddressList
          getAdressDefault={getAdressDefault}
          closeModalAddress={closeModalAddress}
          openModalAddress={openModalAddress}
          open={open}
          onClose={() => setOpen(false)}
          setDefaultAddress={setDefaultAddress}
          addList={addList}
        />
      </Box>
    </div>
  );
}
