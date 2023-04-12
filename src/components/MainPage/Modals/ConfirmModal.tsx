import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { style } from "../../../utils/utils";
import Button from "@mui/material/Button";
import { IContact } from "../../../store/types";

type ConfirmModalProps = {
  openConfirmPopup: boolean;
  handleCloseConfirmPopup: () => void;
  handleRemoveContact: (c: IContact) => void;
  editContactById: IContact;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  openConfirmPopup,
  handleCloseConfirmPopup,
  handleRemoveContact,
  editContactById,
}) => {
  return (
    <Modal open={openConfirmPopup} onClose={handleCloseConfirmPopup}>
      <Fade in={openConfirmPopup}>
        <Box sx={style}>
          <h4 style={{ margin: "0px auto 15px" }}>Вы уверены?</h4>
          <Button
            style={{
              width: "200px",
              margin: "auto",
              border: "1px solid #985ace",
            }}
            onClick={() => {
              handleRemoveContact(editContactById);
              handleCloseConfirmPopup();
            }}
            variant="outlined"
          >
            Удалить
          </Button>
          <button
            style={{
              width: "200px",
              margin: "15px auto",
              border: "1px solid #985ace",
            }}
            onClick={handleCloseConfirmPopup}
          >
            Отмена
          </button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
