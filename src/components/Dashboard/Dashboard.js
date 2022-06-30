import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <h1>Olá, Júlio Cezar</h1>
        <Link to="/">
          <ion-icon name="exit-outline"></ion-icon>
        </Link>
      </Header>
      <ContainerHistorico>
        <Historico>
          <Item>
            <p>
              <span>11/11/20</span> Desc
            </p>
            <p className="positivo">valor</p>
          </Item>
          <Item>
            <p>
              <span>11/11/20</span> Desc
            </p>
            <p className="negativo">valor</p>
          </Item>
          <Saldo>
            <h4>Saldo:</h4>
            <p>0</p>
          </Saldo>
        </Historico>
      </ContainerHistorico>
      <Operacoes>
        <BotaoOperacao>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>Nova entrada</p>
        </BotaoOperacao>
        <BotaoOperacao>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>Nova saída</p>
        </BotaoOperacao>
      </Operacoes>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
  overflow-y: scroll;
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
  height: 70%;
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
    width: 50%;
    margin-top: 0.8rem;
  }
`;
