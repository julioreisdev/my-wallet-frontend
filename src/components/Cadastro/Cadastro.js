import styled from "styled-components";
import { useContext, useState } from "react";
import dadosUser from "../Context/ContextUser";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  let navigate = useNavigate();

  const [senhaFraca, setSenhaFraca] = useState(false);
  const [senhasConferem, setSenhasConferem] = useState(true);
  const [avisoEmail, setAvisoEmail] = useState("");

  function submitCadastro(e) {
    e.preventDefault();
    if (senha === confirmSenha) {
      const promise = axios.post("http://localhost:5000/cadastro", {
        nome,
        email,
        senha,
      });
      promise
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((erro) => {
          setAvisoEmail(erro.response.data);
        });
    }
  }

  return (
    <Container
      corFundoSenha={senhaFraca ? "#F0E68C" : "#fff"}
      corBordaSenhas={senhasConferem ? "#fff" : "#FA8072"}
    >
      <Logo>MyWallet</Logo>
      <form onSubmit={(e) => submitCadastro(e)}>
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={nome}
          required
          onChange={(e) => setNome(e.target.value)}
        />
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
          name="senha"
          id="senha"
          placeholder="Senha"
          value={senha}
          required
          onChange={(e) => {
            setSenha(e.target.value);
            let senhaAtual = e.target.value;
            if (senhaAtual.length < 6) {
              setSenhaFraca(true);
            } else {
              setSenhaFraca(false);
            }
          }}
        />
        <input
          type="password"
          id="confirmSenha"
          name="confirmeSenha"
          placeholder="Confirme a senha"
          value={confirmSenha}
          required
          onChange={(e) => {
            setConfirmSenha(e.target.value);
            if (senha !== e.target.value) {
              setSenhasConferem(false);
            }
            if (e.target.value === senha) {
              setSenhasConferem(true);
            }
          }}
        />
        <p className="aviso-email-cadastrado">{avisoEmail}</p>
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

    input[name="senha"] {
      background-color: ${(props) => props.corFundoSenha} !important;
    }

    input[name="confirmeSenha"] {
      background-color: ${(props) => props.corBordaSenhas};
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
`;
