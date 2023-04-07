import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../store/api/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const [auth, { data, isSuccess, error, isError }] = useAuthMutation();

  const dispatch = useAppDispatch();

  if (isError) {
    toast.error("Введены не верные данные");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      await auth({ email, password });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getUserData({ token: data.accessToken, userId: data.user.id }));
      navigate("/");
    }
  });

  return (
    <form onSubmit={handleLogin}>
      <div className="form-container">
        <h2 className="form-title">Вход</h2>
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="filled"
          required={true}
        />
        <span>{"Вы неверно указали адрес e-mail"}</span>
        <TextField
          sx={{
            mt: "10px",
          }}
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          required={true}
        />
        <span>{"Вы неверно указали пароль"}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            setEmail("leatherface@mail.ru");
            setPassword("963852741");
          }}
        >
          Заполнить данные тестового пользователя
        </button>
        <button>Авторизация</button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Login;
