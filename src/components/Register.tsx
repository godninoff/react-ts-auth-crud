import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";
import TextField from "@mui/material/TextField";
import { isFetchBaseQueryError, validEmail, validPsw } from "../utils/utils";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [backendError, setBackendError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [pswError, setPswError] = React.useState("");

  const navigate = useNavigate();

  const [register, { data, isSuccess, error }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await register({ email, password });
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

  if (backendError === "Email already exists") {
    setBackendError(
      backendError.replace(
        /Email already exists/gi,
        "Указаный email уже зарегистрирован"
      )
    );
  }

  if (backendError === "Password is too short") {
    setBackendError(
      backendError.replace(
        /Password is too short/gi,
        "Указаный email уже зарегистрирован"
      )
    );
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="form-container">
        <h2 className="form-title">Регистрация</h2>
        <TextField
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          required={true}
          label="E-mail"
          variant="filled"
        />
        {emailError && <span>{emailError}</span>}

        <TextField
          sx={{
            mt: "10px",
          }}
          type="password"
          value={password}
          onChange={(e) => handlePswChange(e.target.value)}
          required={true}
          label="Пароль"
          variant="filled"
        />

        {backendError ? <span>{backendError}</span> : <span>{pswError}</span>}

        <button>Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default Register;
