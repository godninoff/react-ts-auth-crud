import React, { SetStateAction, Dispatch } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { style, urlPattern, validName } from "../../../utils/utils";
import { useAppSelector } from "../../../store/hooks";
import {
  useEditContactMutation,
  useRemoveContactMutation,
} from "../../../store/api/contactsApi";
import { IContact } from "../../../store/types";
import Button from "@mui/material/Button";
import ConfirmModal from "./ConfirmModal";

type EditModalProps = {
  open: boolean;
  handleClose: () => void;
  editContactById: IContact;
  setContactById: Dispatch<SetStateAction<IContact>>;
  setOpen: (e: boolean) => void;
};

const EditContactModal: React.FC<EditModalProps> = ({
  open,
  handleClose,
  editContactById,
  setContactById,
  setOpen,
}) => {
  const [disabledButton, setDisabledButton] = React.useState(false);
  const [editContactNameErr, setEditContactNameErr] = React.useState("");
  const [editContactSurnameErr, setEditContactSurnameErr] = React.useState("");
  const [editContactAvatarErr, setEditContactAvatarErr] = React.useState("");

  const [openConfirmPopup, setOpenConfirmPopup] = React.useState(false);
  const handleOpenConfirmPopup = () => setOpenConfirmPopup(true);
  const handleCloseConfirmPopup = () => setOpenConfirmPopup(false);

  const userId = useAppSelector((state) => state.auth.userId);

  const handleRemoveContact = async (contact: IContact) => {
    await removeContact(contact);
    setOpen(false);
  };
  const [removeContact] = useRemoveContactMutation();
  const [editContact] = useEditContactMutation();

  const handleUpdateContact = async () => {
    if (userId)
      await editContact({
        avatar: editContactById.avatar,
        id: editContactById.id,
        name: editContactById.name,
        surname: editContactById.surname,
        userId,
      });
    setOpen(false);
  };

  const handleEditContactName = (editContactName: string) => {
    setContactById((prev: IContact) => ({
      ...prev,
      name: editContactName,
    }));
    if (editContactName.length === 0) {
      setDisabledButton(true);
      setEditContactNameErr("Необходимо указать имя");
      return;
    }
    if (!validName.test(editContactName)) {
      setDisabledButton(true);
      setEditContactNameErr("Укажите корректное имя");
      return;
    }
    setDisabledButton(false);
    setEditContactNameErr("");
  };

  const handleEditContactSurname = (editContactSurname: string) => {
    setContactById((prev: IContact) => ({
      ...prev,
      surname: editContactSurname,
    }));
    if (!validName.test(editContactSurname)) {
      setDisabledButton(true);
      setEditContactSurnameErr("Укажите корректную фамилию");
      return;
    }
    setDisabledButton(false);
    setEditContactSurnameErr("");
  };

  const handleEditContactAvatar = (editContactAvatar: string) => {
    setContactById((prev: IContact) => ({
      ...prev,
      avatar: editContactAvatar,
    }));
    if (!urlPattern.test(editContactAvatar)) {
      setDisabledButton(true);
      setEditContactAvatarErr("Укажите корректный URL");
      return;
    }
    setDisabledButton(false);
    setEditContactAvatarErr("");
  };

  React.useEffect(() => {
    if (editContactById.name === "") {
      setDisabledButton(true);
    }
    if (!open) {
      setContactById({ name: "", surname: "", avatar: "", id: "" });
      setEditContactNameErr("");
      setEditContactSurnameErr("");
    }
  }, [open, editContactById.name, setContactById]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={style}>
          <TextField
            type="text"
            label="Имя"
            value={editContactById.name}
            onChange={(e) => handleEditContactName(e.target.value)}
            variant="filled"
          />
          <span>{editContactNameErr}</span>
          <TextField
            sx={{
              mt: "10px",
            }}
            type="text"
            label="Фамилия"
            value={editContactById.surname}
            onChange={(e) => handleEditContactSurname(e.target.value)}
            variant="filled"
          />

          <span>{editContactSurnameErr}</span>
          <TextField
            sx={{
              mt: "10px",
            }}
            type="url"
            label="Ссылка на аватар"
            value={editContactById.avatar}
            onChange={(e) => handleEditContactAvatar(e.target.value)}
            variant="filled"
          />
          <span>{editContactAvatarErr}</span>
          <button
            disabled={disabledButton}
            style={{ width: "200px", marginBottom: "10px" }}
            onClick={() => {
              handleUpdateContact();
            }}
          >
            Обновить
          </button>
          <Button
            style={{
              width: "200px",
              margin: "auto",
              border: "1px solid #985ace",
            }}
            onClick={() => handleOpenConfirmPopup()}
            variant="outlined"
          >
            Удалить
          </Button>
          <ConfirmModal
            openConfirmPopup={openConfirmPopup}
            handleCloseConfirmPopup={handleCloseConfirmPopup}
            handleRemoveContact={handleRemoveContact}
            editContactById={editContactById}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditContactModal;
