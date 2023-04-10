import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useAddContactMutation } from "../../../store/api/contactsApi";
import TextField from "@mui/material/TextField";
import "../../Login/Login.css";
import { style, validName } from "../../../utils/utils";
import { validationContactName } from "../../../store/validationSlice";

const AddContactModal = ({ open, handleClose, setOpen }: any) => {
  const [contactName, setContactName] = React.useState("");
  const [contactSurname, setContactSurname] = React.useState("");
  const [newContactNameErr, setNewContactNameErr] = React.useState("");
  const [newContactSurnameErr, setNewContactSurnameErr] = React.useState("");

  const [disabledButton, setDisabledButton] = React.useState(false);

  const userId = useAppSelector((state) => state.auth.userId);
  const validation = useAppSelector((state) => state.validation.name);

  const [addContact] = useAddContactMutation();

  const dispatch = useAppDispatch();

  const handleAddContact = async () => {
    if (userId)
      await addContact({
        id: nanoid(4),
        name: contactName,
        surname: contactSurname,
        userId,
      });
    setContactName("");
    setContactSurname("");
    setOpen(false);
  };

  // const handleAddContactName = (newContactName: string) => {
  //   setContactName(newContactName);
  //   if (newContactName.length === 0) {
  //     setDisabledButton(true);
  //     setNewContactNameErr("Необходимо указать имя");
  //     return;
  //   }
  //   if (!validName.test(newContactName)) {
  //     setDisabledButton(true);
  //     setNewContactNameErr("Укажите корректное имя");
  //     return;
  //   }
  //   setDisabledButton(false);
  //   setNewContactNameErr("");
  // };

  const handleAddContactName = (newContactName: string) => {
    setContactName(newContactName);
    dispatch(validationContactName(validation));
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

  React.useEffect(() => {
    if (contactName === "") {
      setDisabledButton(true);
    }
  }, [contactName]);

  // console.log(validation);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <TextField
            type="text"
            label="Имя"
            value={contactName}
            onChange={(e) => handleAddContactName(e.target.value)}
            variant="filled"
          />
          <span>{validation}</span>
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
          <button onClick={handleAddContact} disabled={disabledButton}>
            Добавить контакт
          </button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddContactModal;
