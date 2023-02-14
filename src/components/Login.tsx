import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../store/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUser } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [auth, { data, isSuccess }] = useAuthMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await auth({ email, password });
    }
    console.error("error");
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getUser({ token: data.accessToken, userId: data.user.id }));
      navigate("/");
      localStorage.setItem("token", data.accessToken);
    }
  });

  return (
    <form onSubmit={handleLogin}>
      <div className="form-container">
        <h2 className="form-title">Вход</h2>
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
        <button type="submit" className="login-btn">
          Авторизация
        </button>
      </div>
    </form>
  );
};

export default Login;
