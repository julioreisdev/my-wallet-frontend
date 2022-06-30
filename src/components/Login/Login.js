import styled from "styled-components";
import { useContext, useState } from "react";
import dadosUser from "../Context/ContextUser";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { email, setEmail, senha, setSenha } = useContext(dadosUser);
  let [loginInvalido, setLoginInvalido] = useState(false);

  function submitLogin(e) {
    e.preventDefault();
    const promise = axios.post("http://localhost:5000/login", { email, senha });
    promise
      .then((res) => {
        console.log(res.data);
      })
      .catch((erro) => {
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
        <button>Entrar</button>
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
  width: 100vw;
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
`;
