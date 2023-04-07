import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../../store/api/authApi";
import { useAppDispatch } from "../../store/hooks";
import { getUserData } from "../../store/authSlice";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { isFetchBaseQueryError, validEmail, validPsw } from "../../utils/utils";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [backendError, setBackendError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [pswError, setPswError] = React.useState("");

  const navigate = useNavigate();

  const [auth, { data, isSuccess, error }] = useAuthMutation();

  const dispatch = useAppDispatch();

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

  const handleEmailChange = (mail: string) => {
    setEmail(mail);
    if (mail.length === 0) {
      setEmailError("Вы не указали адрес e-mail");
      return;
    }
    if (!validEmail.test(mail)) {
      setEmailError("Вы не корректно указали адрес e-mail");
      return;
    }
    setEmailError("");
  };

  const handlePswChange = (psw: string) => {
    setPassword(psw);
    if (psw.length === 0) {
      setPswError("Вы не указали пароль");
      return;
    }
    if (!validPsw.test(psw)) {
      setPswError("Пароль должен быть от 4 до 16 символов");
      return;
    }
    setPswError("");
  };

  React.useEffect(() => {
    if (isFetchBaseQueryError(error)) {
      const errorText = error.data as string;
      setBackendError(errorText);
    }
  }, [error]);

  if (backendError === "Password is too short") {
    setBackendError(
      backendError.replace(
        /Password is too short/gi,
        "Пароль должен быть от 4 до 16 символов"
      )
    );
  }

  if (backendError === "Cannot find user") {
    setBackendError(
      backendError.replace(
        /Cannot find user/gi,
        "Пользователь с таким email не зарегистрирован"
      )
    );
  }

  if (backendError === "Incorrect password") {
    setBackendError(
      backendError.replace(/Incorrect password/gi, "Неверный пароль")
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="form-container">
        <h2 className="form-title">Вход</h2>
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          variant="filled"
          required={true}
        />
        <span>{emailError}</span>
        <TextField
          sx={{
            mt: "10px",
          }}
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => handlePswChange(e.target.value)}
          variant="filled"
          required={true}
        />
        {backendError ? <span>{backendError}</span> : <span>{pswError}</span>}
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
    </form>
  );
};

export default Login;
