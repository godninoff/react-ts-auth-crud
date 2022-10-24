import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { signOut } from "../store/userSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // dispatch(signOut());
    navigate("/login");
  };
  return (
    <div>
      MainPage
      <button onClick={(e) => handleLogout(e)}>Выйти из аккаунта</button>
    </div>
  );
};

export default MainPage;
