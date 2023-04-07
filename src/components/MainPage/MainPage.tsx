import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/authSlice";
import { useAddContactMutation } from "../../store/api/contactsApi";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Contacts from "./Contacts/Contacts";

const MainPage = () => {
  const [contactName, setContactName] = React.useState("");
  const [contactSurname, setContactSurname] = React.useState("");

  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [addContact] = useAddContactMutation();

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

  return (
    <div className="main-page-container">
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
      <Contacts />
    </div>
  );
};

export default MainPage;
