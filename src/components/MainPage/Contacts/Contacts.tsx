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

const Contacts = () => {
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
                  <div>{contact.name}</div>
                  <div>{contact.surname}</div>
                  <button
                    onClick={() => {
                      setEditState(true);
                      setContactById(contact);
                    }}
                  >
                    Редактировать
                  </button>

                  <Button
                    style={{ color: "black", border: "1px solid black" }}
                    onClick={() => handleRemoveContact(contact)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Удалить
                  </Button>
                </div>
              ) : null;
            })
          : "Список контактов пуст")}
    </div>
  );
};

export default Contacts;
