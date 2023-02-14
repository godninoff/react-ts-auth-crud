import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, signOut } from "../store/authSlice";
import {
  addContact,
  IContact,
  removeContact,
  editContact,
} from "../store/contactsSlice";

const MainPage = () => {
  const [contactName, setContactName] = React.useState("");
  const [contactSurname, setContactSurname] = React.useState("");
  const [editState, setEditState] = React.useState(false);
  const [editContactById, setContactById] = React.useState(0);

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/login");
  };

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
      <button
        onClick={() => {
          dispatch(
            addContact({ id: contacts.length + 1, contactName, contactSurname })
          );
          setContactName("");
          setContactSurname("");
        }}
      >
        Добавить контакт
      </button>
      <div className="contacts">
        {contacts.length > 0
          ? contacts.map((contact: IContact) => {
              return (
                <div key={contact.id} className="contact">
                  {editState && editContactById === contact.id}

                  <div>{contact.name}</div>
                  <div>{contact.surname}</div>
                  <button
                    onClick={() => {
                      setEditState(true);
                      setContactById(contact.id);
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => dispatch(removeContact({ id: contact.id }))}
                  >
                    Удалить
                  </button>
                </div>
              );
            })
          : "Список контактов пуст"}
      </div>
    </div>
  );
};

export default MainPage;
