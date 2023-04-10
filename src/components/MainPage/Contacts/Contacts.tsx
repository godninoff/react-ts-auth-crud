import React from "react";
import { useNavigate } from "react-router-dom";
import { IContact } from "../../../store/types";
import {
  useEditContactMutation,
  useGetContactsQuery,
  useRemoveContactMutation,
} from "../../../store/api/contactsApi";
import { useAppSelector } from "../../../store/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const Contacts = ({ open, handleClose, setOpen, handleOpen }: any) => {
  const [editState, setEditState] = React.useState(false);
  const [editContactById, setContactById] = React.useState<IContact>({
    id: "",
    name: "",
    surname: "",
    userId: 0,
  });

  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);

  const { data: contacts, isSuccess } = useGetContactsQuery();
  const [removeContact] = useRemoveContactMutation();
  const [editContact] = useEditContactMutation();

  const handleRemoveContact = async (contact: IContact) => {
    await removeContact(contact);
  };

  const handleUpdateContact = async () => {
    if (userId)
      await editContact({
        id: editContactById.id,
        name: editContactById.name,
        surname: editContactById.surname,
        userId,
      });
    setEditState(false);
  };

  React.useEffect(() => {
    if (!userId && !token) {
      navigate("/login");
    }
  });

  return (
    <div className="contacts">
      {editState && (
        <>
          <input
            value={editContactById.name}
            type="text"
            onChange={(e) =>
              setContactById((prev: IContact) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <input
            value={editContactById.surname}
            type="text"
            onChange={(e) =>
              setContactById((prev: IContact) => ({
                ...prev,
                surname: e.target.value,
              }))
            }
          />
          <button
            onClick={() => {
              handleUpdateContact();
            }}
          >
            Обновить
          </button>
        </>
      )}

      {isSuccess &&
        (!editState && contacts.length > 0
          ? contacts.map((contact: IContact) => {
              return contact.userId === userId ? (
                <div key={contact.id} className="contact">
                  <>
                    <img
                      className="contact-avatar"
                      alt="фото контакта"
                      src="data:image/jpeg;base64,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"
                    />
                    <div>{contact.name}</div>
                    <div>{contact.surname}</div>
                  </>

                  <button
                    style={{ width: "200px" }}
                    // onClick={() => {
                    //   setEditState(true);
                    //   setContactById(contact);
                    // }}
                    onClick={() => handleOpen()}
                  >
                    Редактировать
                  </button>

                  {/* <Button
                    style={{ color: "black", border: "1px solid black" }}
                    onClick={() => handleRemoveContact(contact)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Удалить
                  </Button> */}
                </div>
              ) : null;
            })
          : "Список контактов пуст")}
    </div>
  );
};

export default Contacts;
