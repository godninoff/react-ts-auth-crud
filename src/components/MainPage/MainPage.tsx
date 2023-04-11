import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../store/hooks";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Contacts from "./Contacts/Contacts";
import Modal from "./Modals/AddContactModal";
import AddContactModal from "./Modals/AddContactModal";
import EditContactModal from "./Modals/EditContactModal";

const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(signOut());
    navigate("/login");
  };

  return (
    <div className="main-page-container">
      <div className="main-page-heading">
        <Stack spacing={2} direction="row">
          <Button onClick={handleOpen} variant="contained">
            Новый контакт
          </Button>
        </Stack>
        <div
          className="main-page-logout-block"
          style={{ display: "flex", alignItems: "center" }}
        >
          <LogoutIcon />
          <button
            style={{ marginLeft: "10px", width: "50px", margin: "0" }}
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>

      <Contacts />
      <AddContactModal
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
      />
    </div>
  );
};

export default MainPage;
