import React from "react";
import { IContact } from "../../../store/types";
import { useGetContactsQuery } from "../../../store/api/contactsApi";
import { useAppSelector } from "../../../store/hooks";

import EditContactModal from "../Modals/EditContactModal";

type ISearch = {
  query: string;
};

const Contacts: React.FC<ISearch> = ({ query }) => {
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
      {isSuccess &&
        (contacts.length > 0
          ? contacts
              .filter((contacts) => {
                if (query === "") {
                  return contacts;
                } else if (
                  contacts.name.toLowerCase().includes(query.toLowerCase()) ||
                  contacts.surname.toLowerCase().includes(query.toLowerCase())
                ) {
                  return contacts;
                }
              })
              .map((contact: IContact) => {
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
      />
    </div>
  );
};

export default Contacts;
