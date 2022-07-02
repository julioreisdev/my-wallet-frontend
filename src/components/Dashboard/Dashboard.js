import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import dadosUser from "../Context/ContextUser";
import axios from "axios";

export default function Dashboard() {
  const { token, setTipoTransacao } = useContext(dadosUser);
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState();
  const [transacoes, setTransacoes] = useState([]);

  let navigate = useNavigate();

  function ItemTransacao(prop) {
    return (
      <Item>
        <p>
          <span>{prop.data}</span> {prop.desc}
        </p>
        <p className={prop.valor >= 0 ? "positivo" : "negativo"}>
          {prop.valor}
        </p>
      </Item>
    );
  }

  function saida() {
    setTipoTransacao("saída");
    navigate("/transacao");
  }

  function entrada() {
    setTipoTransacao("entrada");
    navigate("/transacao");
  }

  const config = {
    headers: {
      token: `Bearer ${token.token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(
      "https://mywalletbackendapi.herokuapp.com/transacoes",
      config
    );
    promise
      .then((res) => {
        setNome(res.data.usuario.nome);
        setSaldo(res.data.usuario.saldo);
        setTransacoes(res.data.transacoes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Header>
        <h1>Olá, {nome}!</h1>
        <Link to="/">
          <ion-icon name="exit-outline"></ion-icon>
        </Link>
      </Header>
      <ContainerHistorico>
        <Historico opacity={transacoes.length === 0 ? 0 : 1}>
          {transacoes.map((t, index) => (
            <ItemTransacao
              key={index}
              data={t.data}
              desc={t.desc}
              valor={t.valor}
            ></ItemTransacao>
          ))}
          <Saldo cor={saldo >= 0 ? "green" : "red"}>
            <h4>Saldo:</h4>
            <p>{saldo}</p>
          </Saldo>
        </Historico>
        <SemHistorico display={transacoes.length === 0 ? "flex" : "none"}>
          <p>Não há registros de entrada ou saída</p>
        </SemHistorico>
      </ContainerHistorico>
      <Operacoes>
        <BotaoOperacao onClick={entrada}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Nova entrada</p>
        </BotaoOperacao>
        <BotaoOperacao onClick={saida}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>Nova saída</p>
        </BotaoOperacao>
      </Operacoes>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #8c11be;
  padding: 1.5rem 1rem 1rem 1rem;
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

const Historico = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 1rem;
  background-color: #fdfdfd;
  overflow-y: scroll !important;
  opacity: ${(props) => props.opacity};
`;

const SemHistorico = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 1rem;
  background-color: #fdfdfd;
  position: absolute;
  top: 0;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;

  p {
    width: 85%;
    text-align: center;
    font-size: 1.3rem;
    color: gray;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;

  span {
    color: gray;
  }
`;

const ContainerHistorico = styled.div`
  width: 100%;
  height: 68vh;
  margin: 1rem 0;
  position: relative;
`;

const Saldo = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: calc(100% - 2rem);
  bottom: 0;
  padding: 0.2rem 0;
  background-color: #fdfdfd;

  h4 {
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #333;
  }

  p {
    color: #333;
    font-size: 1.1rem;
    color: ${(props) => props.cor};
    font-weight: bold;
  }
`;

const Operacoes = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
`;

const BotaoOperacao = styled.div`
  width: 47%;
  height: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  background-color: #a328d6;
  font-size: 1.3rem;
  color: #fdfdfd;
  font-weight: bold;

  p {
    width: 45%;
    margin-top: 0.8rem;
  }
`;
