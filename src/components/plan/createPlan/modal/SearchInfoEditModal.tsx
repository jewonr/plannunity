import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../modules";
import EditAndCreateButton from "../../.././templates/EditAndCreateButton";
import { unsetActive } from "../../../../modules/isActive";
import { useEffect, useState } from "react";
import { addLink, updateLink } from "../../../../modules/linkInfo";

const Container = styled.div<{ isActive: boolean }>`
  background: #ffffff;
  padding: 25px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
`;

const MainText = styled.div`
  font-size: 22px;
  line-height: 35px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
`

const Label = styled.div`
  font-size: 18px;
  line-height: 20px;
`

const Input = styled.input`
  background: #F9F9F9;
  border: 1px solid #EDEDED;
  border-radius: 12px;
  width: 100%;
  height: 50px;
  padding: 15px;
  font-size: 15px;
  line-height: 20px;

  &::placeholder {
    color: #BFBFBF;
    font-family: 'SUIT-500';
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export default function SearchInfoEditModal() {
  const { searchInfoEditOne } = useSelector((state: RootState) => state.isActive);
  const selectedLink = useSelector((state: RootState) => state.linkInfo).filter(item => item.isSelected)[0];

  const dispatch = useDispatch();
  const [link, setLink] = useState("");

  const onClickCancelButton = () => {
    dispatch(updateLink(selectedLink.link, selectedLink.id));
    dispatch(unsetActive("searchInfoEditOne"));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  }

  const onClickSubmitButton = () => {
    dispatch(updateLink(link, selectedLink.id));
    dispatch(unsetActive("searchInfoEditOne"));
    setLink("");
  }

  useEffect(() => {
    if(selectedLink) {
      setLink(selectedLink.link);
    }
  }, [selectedLink]);

  if(!selectedLink) return <></>;

  if(selectedLink.link.length) {
    return (
      <Container isActive={searchInfoEditOne}>
        <TopWrapper>
          <MainText>?????? ?????? ??????</MainText>
          <img src="images/cancel.svg" onClick={onClickCancelButton} />
        </TopWrapper>
        <InputWrapper>
          <Label>????????? ????????? ??????</Label>
          <Input placeholder="????????? ??????????????????(???: https://naver.com)" onChange={onChange} value={link} />
        </InputWrapper>
        <ButtonWrapper>
          <EditAndCreateButton
            text="?????? ?????? ????????????"
            btnColor="orange"
            onClick={onClickSubmitButton}
          />
        </ButtonWrapper>
      </Container>
    );
  } else {
    return <></>;
  }
}
