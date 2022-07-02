import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function LoaderBotao({ w, h }) {
  return (
    <Container>
      <ThreeDots color="#fff" height={h} width={w} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
