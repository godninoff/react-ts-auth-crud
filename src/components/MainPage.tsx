import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState, signOut } from "../store/authSlice";
import {
  useAddContactMutation,
  useEditContactMutation,
  useGetContactsQuery,
  useRemoveContactMutation,
} from "../store/api/contactsApi";

import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import { IContact } from "../store/types";

const MainPage = () => {
  const [contactName, setContactName] = React.useState("");
  const [contactSurname, setContactSurname] = React.useState("");
  const [editState, setEditState] = React.useState(false);
  const [editContactById, setContactById] = React.useState<IContact>({
    id: "",
    name: "",
    surname: "",
    userId: 0,
  });

  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: contacts, isSuccess } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const [removeContact] = useRemoveContactMutation();
  const [editContact] = useEditContactMutation();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(signOut());
    navigate("/login");
  };

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
  };

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

  console.log(contacts);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      Страница авторизованного пользователя
      <button onClick={handleLogout}>Выйти из аккаунта</button>
      <input
        type="text"
        placeholder="Имя"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Фамилия"
        value={contactSurname}
        onChange={(e) => setContactSurname(e.target.value)}
      ></input>
      <button onClick={handleAddContact}>Добавить контакт</button>
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
                return (
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
                    <button onClick={() => handleRemoveContact(contact)}>
                      Удалить
                    </button>
                  </div>
                );
              })
            : "Список контактов пуст")}
      </div>
    </div>
  );
};

export default MainPage;
