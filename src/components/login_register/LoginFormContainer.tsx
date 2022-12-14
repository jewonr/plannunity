import styled from "styled-components";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import LoginSubText from "./LoginSubText"
import Logo from "../../../public/images/logo.svg";
import LoginMainText from "./LoginMainText";
import CheckBox from "../../../public/images/check-square.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sign } from "../../firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLogin } from "../../modules/userInfo";

const Container = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  height: 100vh;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity .75s, ${props => props.visible ? "transform .75s" : ""};
  transform: ${props => props.visible ? "translateY(0)" : "translateY(50px)"};
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 50px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div<{ isActive: string }>`
  font-size: 15px;
  line-height: 20px;
  color: #ff2525;
  margin-bottom: 20px;
  display: ${props => props.isActive === "" ? "none" : "auto"};
`;

const PasswordOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const PasswordOptionLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Text = styled.span<{ color: string }>`
  font-size: 15px;
  line-height: 19px;
  color: ${(props) =>
    props.color === "white"
      ? "#979797"
      : props.color === "orange"
      ? "#FF833E"
      : "#000000"};
`;

const InputWrapper = styled.div``;

const Box = styled.div`
  height: 20px;
`;

const BottomTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

export default function LoginFormContainer() {
  const [rememberPassword, setRememberPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const onClickSubmitButton = async () => {
    const data = await sign("email", email, password);
    console.log(data);
    if(data.code) {
      console.log(data.code);
      switch (data.code) {
        case "auth/user-not-found":
          setErrMsg("????????? ?????? ??? ????????????");
          break;
        case "auth/wrong-password":
          setErrMsg("??????????????? ?????? ??????????????????");
          break;
        default:
          setErrMsg("????????? ???????????????");
      };
    } else {
      localStorage.setItem("name", data.displayName!);
      localStorage.setItem("email", data.email!);
      localStorage.setItem("imgURL", (data.imgURL ? data.imgURL! : "https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_1280.png"));
      // dispatch(setLogin(data.displayName!, data.email!, data.photoURL!));
      router.push("/");
    }
  };

  return (
    <Container visible={visible}>
      <TopWrapper>
        <Logo />
        <LoginMainText
          text1="????????? ????????? ??????"
          text2="????????? ?????????????????????"
        />
      </TopWrapper>
      <FormWrapper>
        <InputWrapper>
          <LoginSubText text="???????????? ??????????????????" />
          <LoginInput
            placeholder="????????? ?????? ??????"
            text={email}
            setText={setEmail}
            inputType="text"
          />
        </InputWrapper>
        <InputWrapper>
          <LoginSubText text="??????????????? ??????????????????" />
          <LoginInput
            placeholder="??????????????? ??????????????????(8??? ??????)"
            text={password}
            setText={setPassword}
            inputType="password"
          />
        </InputWrapper>
      </FormWrapper>
      <ErrorMessage isActive={errMsg}>{errMsg}</ErrorMessage>
      <PasswordOptionWrapper>
        <PasswordOptionLeftWrapper
          onClick={() => setRememberPassword(!rememberPassword)}
        >
          <CheckBox stroke={rememberPassword ? "#FF833E" : "#979797"} />
          <Text color={rememberPassword ? "orange" : "white"}>
            ???????????? ????????????
          </Text>
        </PasswordOptionLeftWrapper>
        <Text color="orange">???????????? ??????</Text>
      </PasswordOptionWrapper>
      <LoginButton text="?????????" onClick={onClickSubmitButton} />
      <Box />
      <BottomTextWrapper>
        <Text color="black">????????? ????????????????</Text>
        <Text color="black">
          <Link
            href="/register"
            style={{ textDecoration: "none", color: "#FF833E" }}
          >
            ????????????
          </Link>
          ??????
        </Text>
      </BottomTextWrapper>
    </Container>
  );
}
