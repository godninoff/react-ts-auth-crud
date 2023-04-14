import React, { SetStateAction, Dispatch } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { style } from "../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  useEditContactMutation,
  useRemoveContactMutation,
} from "../../../store/api/contactsApi";
import { IContact } from "../../../store/types";
import Button from "@mui/material/Button";
import ConfirmModal from "./ConfirmModal";
import {
  resetData,
  validationContactAvatar,
  validationContactName,
  validationContactSurname,
} from "../../../store/validationSlice";

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
  const [openConfirmPopup, setOpenConfirmPopup] = React.useState(false);
  const handleOpenConfirmPopup = () => setOpenConfirmPopup(true);
  const handleCloseConfirmPopup = () => setOpenConfirmPopup(false);

  const dispatch = useAppDispatch();
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
    dispatch(validationContactName(editContactName));
  };

  const handleEditContactSurname = (editContactSurname: string) => {
    setContactById((prev: IContact) => ({
      ...prev,
      surname: editContactSurname,
    }));
    dispatch(validationContactSurname(editContactSurname));
  };

  const handleEditContactAvatar = (editContactAvatar: string) => {
    setContactById((prev: IContact) => ({
      ...prev,
      avatar: editContactAvatar,
    }));
    validationState && dispatch(validationContactAvatar(editContactAvatar));
  };

  React.useEffect(() => {
    if (!open) {
      dispatch(resetData());
    }
  }, [open]);

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
          <span>{validatonErrName}</span>
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

          <span>{validatonErrSurname}</span>
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
          <span>{validatonErrAvatar}</span>
          <button
            disabled={disabledState}
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
