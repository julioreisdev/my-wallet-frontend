import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import Login from "./Login/Login";
import dadosUser from "./Context/ContextUser";
import { useState } from "react";
import Cadastro from "./Cadastro/Cadastro";
import Dashboard from "./Dashboard/Dashboard";
import Transacao from "./Transacao/Transacao";

export default function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [token, setToken] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("");

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
          token,
          setToken,
          tipoTransacao,
          setTipoTransacao
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transacao" element={<Transacao />} />
        </Routes>
      </dadosUser.Provider>
    </BrowserRouter>
  );
}
