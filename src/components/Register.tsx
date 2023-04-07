import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";
import TextField from "@mui/material/TextField";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [pswError, setPswError] = React.useState("");

  const navigate = useNavigate();

  const [register, { data, isSuccess }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await register({ email, password });
    }
    console.error("error");
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getUserData({ token: data.accessToken, userId: data.user.id }));
      navigate("/");
    }
  });

  const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const validPsw = /^[A-Za-z0-9]{4,16}$/;

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
        {pswError && <span>{pswError}</span>}

        <button>Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default Register;
