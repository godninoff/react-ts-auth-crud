import React from "react";
import { useNavigate } from "react-router-dom";
import { IContact } from "../../../store/types";
import {
  useEditContactMutation,
  useGetContactsQuery,
  useRemoveContactMutation,
} from "../../../store/api/contactsApi";
import { useAppSelector } from "../../../store/hooks";

import EditContactModal from "../Modals/EditContactModal";

const Contacts = () => {
  const [editState, setEditState] = React.useState(false);
  const [editContactById, setContactById] = React.useState<IContact>({
    id: "",
    name: "",
    surname: "",
    avatar: "",
    userId: 0,
  });
  const userId = useAppSelector((state) => state.auth.userId);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: contacts, isSuccess } = useGetContactsQuery();

  return (
    <div className="contacts">
      {/* {editState && (
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
      )} */}

      {isSuccess &&
        (!editState && contacts.length > 0
          ? contacts.map((contact: IContact) => {
              return contact.userId === userId ? (
                <div key={contact.id} className="contact">
                  <>
                    <img
                      className="contact-avatar"
                      alt="фото контакта"
                      src={contact.avatar}
                    />

                    <div>{contact.name}</div>
                    <div>{contact.surname}</div>
                  </>

                  <button
                    style={{ width: "200px" }}
                    onClick={() => {
                      handleOpen();
                      setContactById(contact);
                    }}
                  >
                    Редактировать
                  </button>
                </div>
              ) : null;
            })
          : "Список контактов пуст")}
      <EditContactModal
        open={open}
        handleClose={handleClose}
        editContactById={editContactById}
        setContactById={setContactById}
        setOpen={setOpen}
        contacts={contacts}
      />
    </div>
  );
};

export default Contacts;
