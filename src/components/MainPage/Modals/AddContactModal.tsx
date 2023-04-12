import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../store/hooks";
import { useAddContactMutation } from "../../../store/api/contactsApi";
import TextField from "@mui/material/TextField";
import "../../Login/Login.css";
import { style, urlPattern, validName } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

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

  const [newContactNameErr, setNewContactNameErr] = React.useState("");
  const [newContactSurnameErr, setNewContactSurnameErr] = React.useState("");
  const [newContactAvatarErr, setNewContactAvatarErr] = React.useState("");

  const [disabledButton, setDisabledButton] = React.useState(false);

  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);

  const [addContact] = useAddContactMutation();
  const navigate = useNavigate();

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
    if (newContactName.length === 0) {
      setDisabledButton(true);
      setNewContactNameErr("Необходимо указать имя");
      return;
    }
    if (!validName.test(newContactName)) {
      setDisabledButton(true);
      setNewContactNameErr("Укажите корректное имя");
      return;
    }
    setDisabledButton(false);
    setNewContactNameErr("");
  };

  const handleAddContactSurname = (newContactSurname: string) => {
    setContactSurname(newContactSurname);
    if (!validName.test(newContactSurname)) {
      setDisabledButton(true);
      setNewContactSurnameErr("Укажите корректную фамилию");
      return;
    }
    setDisabledButton(false);
    setNewContactSurnameErr("");
  };

  const handleAddContactAvatar = (newContactAvatar: string) => {
    setContactAvatar(newContactAvatar);
    if (!urlPattern.test(newContactAvatar)) {
      setDisabledButton(true);
      setNewContactAvatarErr("Укажите корректный URL");
      return;
    }
    setDisabledButton(false);
    setNewContactAvatarErr("");
  };

  React.useEffect(() => {
    if (!userId && !token) {
      navigate("/login");
    }
  });

  React.useEffect(() => {
    if (contactName === "") {
      setDisabledButton(true);
    }
    if (!open) {
      setContactName("");
      setContactSurname("");
      setContactAvatar("");
      setNewContactNameErr("");
      setNewContactSurnameErr("");
    }
  }, [contactName, open]);

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
          <span>{newContactNameErr}</span>
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
          <span>{newContactSurnameErr}</span>
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
          <span>{newContactAvatarErr}</span>
          <button onClick={handleAddContact} disabled={disabledButton}>
            Добавить контакт
          </button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddContactModal;
