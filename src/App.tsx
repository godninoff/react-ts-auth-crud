import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import MainPage from "./components/MainPage/MainPage";
import Page404 from "./components/Page404";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
