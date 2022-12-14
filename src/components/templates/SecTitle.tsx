import styled from "styled-components";

const Container = styled.div`
  font-size: 20px;
  line-height: 25px;
  margin-bottom: 25px;
  margin-left: 5px;
`

type SecTitleType = {
  text: string;
}

export default function SecTitle({ text }: SecTitleType) {
  return (
    <Container>{text}</Container>
  );
}