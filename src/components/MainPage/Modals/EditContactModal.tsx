import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { style } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import {
  useEditContactMutation,
  useRemoveContactMutation,
} from "../../../store/api/contactsApi";
import { IContact } from "../../../store/types";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const EditContactModal = ({
  open,
  handleClose,
  editContactById,
  setContactById,
  setOpen,
  contacts,
}: any) => {
  const [editState, setEditState] = React.useState(false);

  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);

  const [editContact] = useEditContactMutation();
  const [removeContact] = useRemoveContactMutation();

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

  const handleRemoveContact = async (contact: IContact) => {
    await removeContact(contact);
  };

  React.useEffect(() => {
    if (!userId && !token) {
      navigate("/login");
    }
  });
  console.log(contacts);
  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={style}>
          <TextField
            type="text"
            label="Имя"
            value={editContactById.name}
            onChange={(e) =>
              setContactById((prev: IContact) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            variant="filled"
          />
          {/* <span>{newContactNameErr}</span> */}
          <TextField
            sx={{
              mt: "10px",
            }}
            type="text"
            label="Фамилия"
            value={editContactById.surname}
            onChange={(e) =>
              setContactById((prev: IContact) => ({
                ...prev,
                surname: e.target.value,
              }))
            }
            variant="filled"
          />

          {/* <span>{newContactSurnameErr}</span> */}
          <button
            style={{ width: "200px", marginBottom: "10px" }}
            onClick={() => {
              handleUpdateContact();
            }}
            // onClick={() => {
            //   setEditState(true);
            //   setContactById(contact);
            // }}
          >
            Обновить
          </button>
          <Button
            style={{ width: "200px", margin: "auto", border: "1px solid red" }}
            onClick={() => handleRemoveContact(contacts)}
            variant="outlined"
          >
            Удалить
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditContactModal;
