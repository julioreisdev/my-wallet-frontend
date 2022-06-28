import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import Login from "./Login/Login";
import dadosUser from "./Context/ContextUser";
import { useState } from "react";
import Cadastro from "./Cadastro/Cadastro";

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  return (
    <BrowserRouter>
      <dadosUser.Provider
        value={{
          nome,
          setNome,
          email,
          setEmail,
          senha,
          setSenha,
          confirmSenha,
          setConfirmSenha,
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </dadosUser.Provider>
    </BrowserRouter>
  );
}
