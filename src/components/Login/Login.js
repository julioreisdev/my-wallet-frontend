import styled from "styled-components";
import { useContext, useState } from "react";
import dadosUser from "../Context/ContextUser";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderBotao from "../Loader/LoaderBotao";

export default function Login() {
  const { email, setEmail, senha, setSenha, setToken } = useContext(dadosUser);
  let [loginInvalido, setLoginInvalido] = useState(false);
  const [sendLogin, setSendLogin] = useState(false);

  let navigate = useNavigate();

  function submitLogin(e) {
    e.preventDefault();
    setSendLogin(true);
    const promise = axios.post(
      "https://mywalletbackendapi.herokuapp.com/login",
      { email, senha }
    );
    promise
      .then((res) => {
        setToken(res.data);
        navigate("/dashboard");
      })
      .catch((erro) => {
        setSendLogin(false);
        setLoginInvalido(true);
      });
  }

  return (
    <Container cor={loginInvalido ? "red" : "#fff"}>
      <Logo>MyWallet</Logo>
      <form onSubmit={(e) => submitLogin(e)}>
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="senha"
          placeholder="Senha"
          value={senha}
          required
          onChange={(e) => setSenha(e.target.value)}
        />
        <button>{sendLogin ? <LoaderBotao w="40" h="20" /> : "Entrar"}</button>
      </form>
      <LinkCadastro>
        <Link className="linkCadastro" to="/cadastro">
          Primeira vez? Cadastre-se!
        </Link>
      </LinkCadastro>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #8c11be;
  padding: 9rem 1rem 0 1rem;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    input {
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
      color: #000;
      border: 2px solid ${(props) => props.cor};
      border-radius: 5px;
    }
    input::placeholder {
      color: #333;
    }

    button {
      width: 100%;
      padding: 0.4rem;
      font-size: 1.3rem;
      color: #fff;
      font-weight: 400;
      border: 1px solid #a328d6;
      border-radius: 5px;
      background-color: #a328d6;
      font-weight: bold;
    }
  }
`;

const Logo = styled.h1`
  font-family: "Saira Stencil One", cursive !important;
  font-size: 2.5rem;
  text-align: center;
  color: #fff;
`;

const LinkCadastro = styled.p`
  text-align: center;
  margin: 2rem 0;
  margin-bottom: 0;
  padding-bottom: 2rem;
`;
