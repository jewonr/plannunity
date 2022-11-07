import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 165px;
  width: 200px; 
  border-radius: 15px;
  background: linear-gradient(180deg, rgba(180, 180, 180, 0.26) 19.7%, rgba(0, 0, 0, 0.58) 100%), url(https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_1280.png);
  background-size: 200px 165px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  &:first-child {
    margin-left: 20px;
  }

  &:last-child {
    margin-right: 20px;
  }
`

const SubText = styled.div`
  color: #FFFFFF;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 5px;
  font-family: 'SUIT-500';
`

const MainText = styled.div`
  color: #FFFFFF;
  font-size: 20px;
  line-height: 25px;
`

export default function ParallelContentItem() {
  const planURL = `plan/${3}`;
  const router = useRouter();
  const onClick = () => {
    router.push(planURL);
  }
  
  return (
      <Container onClick={onClick}>
        <SubText>강력 추천 플랜</SubText>
        <MainText>부산 당일치기 플랜</MainText>
      </Container>
  );
}