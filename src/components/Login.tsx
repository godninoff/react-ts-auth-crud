import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../store/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUser } from "../store/authSlice";

const Login = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [
    auth,
    {
      data: authData,
      isSuccess: authSuccess,
      isError: isAuthError,
      error: authError,
    },
  ] = useAuthMutation();

  const dispatch = useAppDispatch();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   dispatch(
  //     login({ name: name, email: email, password: password, loggedIn: true })
  //   );
  //   navigate("/");
  // };

  const handleLogin = async () => {
    if (email && password) {
      await auth({ email, password });
    }
    console.error("error");
  };

  React.useEffect(() => {
    if (authSuccess) {
      dispatch(getUser({ user: authData.result.user, token: authData.token }));
      navigate("/");
    }
  });

  return (
    <div className="login">
      <h2>Login</h2>
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
      <button type="submit" className="login-btn" onClick={() => handleLogin()}>
        Авторизация
      </button>
    </div>
  );
};

export default Login;
