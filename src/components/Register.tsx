import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
      //   localStorage.setItem("token", data.accessToken);
      // setUserId(+data.user.id);
    }
  });

  return (
    <form onSubmit={handleRegister}>
      <div className="form-container">
        <h2 className="form-title">Регистрация</h2>
        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default Register;
