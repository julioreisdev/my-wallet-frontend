import { useContext, useState } from "react";
import dadosUser from "../Context/ContextUser";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderBotao from "../Loader/LoaderBotao";

export default function Transacao() {
  const { tipoTransacao, token } = useContext(dadosUser);

  const [valor, setValor] = useState(0);
  const [desc, setDesc] = useState("");

  const [sendTransacao, setSendTransacao] = useState(false);

  let navigate = useNavigate();

  const config = {
    headers: {
      token: `Bearer ${token.token}`,
    },
  };

  function submit(e) {
    e.preventDefault();

    setSendTransacao(true);

    let promise;

    if (tipoTransacao === "saída") {
      promise = axios.post(
        "https://mywalletbackendapi.herokuapp.com/transacao",
        { desc, valor: -valor },
        config
      );
    } else {
      promise = axios.post(
        "https://mywalletbackendapi.herokuapp.com/transacao",
        { desc, valor },
        config
      );
    }

    promise
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        setSendTransacao(false);
        console.log(err);
      });
  }

  return (
    <Container>
      <Header>
        <h1>Nova {tipoTransacao}</h1>
        <Link to="/dashboard">
          <ion-icon name="arrow-back-circle-outline"></ion-icon>
        </Link>
      </Header>
      <form onSubmit={(e) => submit(e)}>
        <input
          id="valor"
          placeholder="Valor"
          type="number"
          required
          value={valor === 0 ? "" : valor}
          onChange={(e) => setValor(Math.abs(e.target.value))}
        ></input>
        <input
          id="descricao"
          placeholder="Descrição"
          type="text"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
        <button>
          {sendTransacao ? (
            <LoaderBotao w="40" h="20" />
          ) : (
            `Salvar ${tipoTransacao}`
          )}
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #8c11be;
  padding: 1.5rem 1rem 1rem 1rem;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #fff;
  }

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
      margin-top: 0.5rem;
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-weight: bold;
  font-size: 1.8rem;

  h1 {
    width: 80%;
  }

  ion-icon {
    color: #fff;
  }
`;
