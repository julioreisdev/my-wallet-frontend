import styled from "styled-components";
import { useContext } from "react";
import dadosUser from "../Context/ContextUser";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    confirmSenha,
    setConfirmSenha,
  } = useContext(dadosUser);

  return (
    <Container>
      <Logo>MyWallet</Logo>
      <form>
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="senha"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          id="confirmSenha"
          placeholder="Confirme a senha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>
      <LinkCadastro>
        <Link className="linkLogin" to="/">
          Já tem uma conta? Entre agora!
        </Link>
      </LinkCadastro>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #8c11be;
  padding: 6rem 1rem 0 1rem;

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
      border: 1px solid #fff;
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
