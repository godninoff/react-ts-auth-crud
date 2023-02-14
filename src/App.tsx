import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
