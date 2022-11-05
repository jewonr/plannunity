import styled from "styled-components";
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import LoginSubText from "../components/LoginSubText";
import Logo from "../../public/images/logo.svg";
import LoginMainText from "../components/LoginMainText";
import { useState } from "react";

const Container = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  height: 100vh;
  opacity: ${props => props.visible ? 1 : 0};
  transition: ${props => props.visible ? 0 : ".3s"};
  z-index: ${props => props.visible ? 1000 : 997};
  background: #FFFFFF;
`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 50px;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`

const Box = styled.div`
  height: 10px;
`

const InputWrapper = styled.div``;

export default function RegisterFormContainer() {
  const [visible, setVisible] = useState(true);
  const onClick = () => {
    setVisible(false);
  }
  return (
    <Container visible={visible}>
      <TopWrapper>
        <Logo />
        <LoginMainText text1="회원가입을 위한" text2="정보를 입력해주세요" />
      </TopWrapper>
      <FormWrapper>
        <InputWrapper>
          <LoginSubText text="이메일을 입력해주세요" />
          <LoginInput placeholder="이메일 주소 입력" />
        </InputWrapper>
        <InputWrapper>
          <LoginSubText text="닉네임을 입력해주세요" />
          <LoginInput placeholder="닉네임을 입력해주세요(10자 이내)" />
        </InputWrapper>
        <InputWrapper>
          <LoginSubText text="비밀번호를 입력해주세요" />
          <LoginInput placeholder="비밀번호를 입력해주세요(8자 이상)" />
          <Box />
          <LoginInput placeholder="비밀번호를 확인" />
        </InputWrapper>
      </FormWrapper>
      <LoginButton text="다음" onClickNextButton={onClick} />
    </Container>
  );
}