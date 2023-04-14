import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useAddContactMutation } from "../../../store/api/contactsApi";
import TextField from "@mui/material/TextField";
import "../../Login/Login.css";
import { style } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import {
  resetData,
  setDisabledState,
  validationContactAvatar,
  validationContactName,
  validationContactSurname,
} from "../../../store/validationSlice";

type IPopupProps = {
  open: boolean;
  handleClose: () => void;
  setOpen: (e: boolean) => void;
};

const AddContactModal: React.FC<IPopupProps> = ({
  open,
  handleClose,
  setOpen,
}) => {
  const [contactName, setContactName] = React.useState("");
  const [contactSurname, setContactSurname] = React.useState("");
  const [contactAvatar, setContactAvatar] = React.useState("");

  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const validationState = useAppSelector((state) => state.validation.name);
  const disabledState = useAppSelector((state) => state.validation.disabled);
  const validatonErrName = useAppSelector(
    (state) => state.validation.contactNameErr
  );
  const validatonErrSurname = useAppSelector(
    (state) => state.validation.contactSurnameErr
  );
  const validatonErrAvatar = useAppSelector(
    (state) => state.validation.contactAvatarErr
  );

  const [addContact] = useAddContactMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddContact = async () => {
    if (userId)
      await addContact({
        id: nanoid(4),
        avatar: contactAvatar,
        name: contactName,
        surname: contactSurname,
        userId,
      });
    setContactName("");
    setContactSurname("");
    setContactAvatar("");
    setOpen(false);
  };

  const handleAddContactName = (newContactName: string) => {
    setContactName(newContactName);
    dispatch(validationContactName(newContactName));
  };

  const handleAddContactSurname = (newContactSurname: string) => {
    setContactSurname(newContactSurname);
    dispatch(validationContactSurname(newContactSurname));
  };

  const handleAddContactAvatar = (newContactAvatar: string) => {
    setContactAvatar(newContactAvatar);
    validationState && dispatch(validationContactAvatar(newContactAvatar));
  };

  React.useEffect(() => {
    if (!userId && !token) {
      navigate("/login");
    }
  });

  React.useEffect(() => {
    if (validationState === "") {
      dispatch(setDisabledState());
    }
    if (!open) {
      setContactName("");
      setContactSurname("");
      setContactAvatar("");
      dispatch(resetData());
    }
  }, [open, validationState]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={style}>
          <TextField
            type="text"
            label="Имя"
            value={contactName}
            onChange={(e) => handleAddContactName(e.target.value)}
            variant="filled"
          />
          <span>{validatonErrName}</span>
          <TextField
            sx={{
              mt: "10px",
            }}
            type="text"
            label="Фамилия"
            value={contactSurname}
            onChange={(e) => handleAddContactSurname(e.target.value)}
            variant="filled"
          />
          <span>{validatonErrSurname}</span>
          <TextField
            sx={{
              mt: "10px",
            }}
            type="url"
            label="Ссылка на аватар"
            value={contactAvatar}
            onChange={(e) => handleAddContactAvatar(e.target.value)}
            variant="filled"
          />
          <span>{validatonErrAvatar}</span>
          <button onClick={handleAddContact} disabled={disabledState}>
            Добавить контакт
          </button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddContactModal;
