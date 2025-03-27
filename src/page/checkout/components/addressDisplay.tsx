import { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddressList from "./addressList";
import { EditOutlined } from "@ant-design/icons";

export default function AddressDisplay({
  openModalAddress,
  closeModalAddress,
  getAdressDefault,
  addList,
  MutateShipping,
  refetchAddrList,
  loadingDefault,
  refetchDefault,
  setIsEdit,
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
    <div className="my-3">
      {!loadingDefault ? (
        <Box
          sx={{
            border: "1px dashed #ddd",
            padding: 2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
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
                color: "#9ebbbd",
                fontSize: 12,
                width:'60px'
              }}
            >
              Mặc Định
            </Box>
            <Button
              onClick={() => setOpen(true)}
              sx={{ color: "red", textTransform: "none" }}
            >
              <EditOutlined />
            </Button>
          </Box>

          <AddressList
            refetchAddrList={refetchAddrList}
            getAdressDefault={getAdressDefault}
            closeModalAddress={closeModalAddress}
            openModalAddress={openModalAddress}
            open={open}
            onClose={() => setOpen(false)}
            setDefaultAddress={setDefaultAddress}
            addList={addList}
            MutateShipping={MutateShipping}
            refetchDefault={refetchDefault}
            setIsEdit={setIsEdit}
          />
        </Box>
      ) : (
        "Đang tải địa chỉ..."
      )}
    </div>
  );
}
