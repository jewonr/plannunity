import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../modules";
import EditAndCreateButton from "../../../templates/EditAndCreateButton";
import { setActive, unsetActive } from "../../../../modules/isActive";
import { useEffect, useState } from "react";
import { updateSchdule } from "../../../../modules/schdule";

const Container = styled.div`
  background: #ffffff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div``;

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
`;

const Label = styled.div`
  font-size: 18px;
  line-height: 20px;
`;

const Input = styled.input`
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #ededed;
  font-size: 15px;
  line-height: 20px;
  border: none;
  padding: 15px;
  border-radius: 12px;

  &::placeholder {
    color: #bfbfbf;
    font-family: "SUIT-500";
  }
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
  align-items: center;
`;

const SeqBox = styled.div`
  background: #F9F9F9;
  border: 1px solid #EDEDED;
  border-radius: 12px;
  height: 50px;
  padding: 15px 26px;
  text-align: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export default function SchduleEditModal() {
  const schdule = useSelector((state: RootState) => state.schdule).filter(item => item.isSelected)[0];
  const place = useSelector((state: RootState) => state.currentData.place);
  const dispatch = useDispatch();
  const onClickCancelButton = () => {
    dispatch(updateSchdule(schdule.title, schdule.desc, schdule.seq, schdule.place, schdule.img));
    dispatch(unsetActive("schduleEditOne"));
    setTitle("");
    setDesc("");
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); 

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.id === "title") setTitle(e.target.value);
    else if(e.currentTarget.id === "desc") setDesc(e.target.value);
  }

  const onClickSubmitButton = () => {
    dispatch(updateSchdule(title, desc, schdule.seq, schdule.place, schdule.img));
    dispatch(unsetActive("schduleEditOne"));
    setTitle("");
    setDesc("");
  }

  const onFocusLocInput = () => {
    dispatch(setActive("searchPlace"));
  }

  useEffect(() => {
    if(schdule) {
      setTitle(schdule.title);
      setDesc(schdule.desc);
    }
  }, [schdule]);

  if(!schdule) return <></>;

  if(schdule.title.length) {
    return (
      <Container>
        <TopWrapper>
          <MainText>
            {schdule.seq}?????? ??????
          </MainText>
          <img src="images/cancel.svg" onClick={onClickCancelButton} />
        </TopWrapper>
        <Wrapper>
          <InputWrapper>
            <Label>?????? ??????</Label>
            <Input placeholder="?????? ????????? ??????????????????." value={place ? place.place_name : schdule.place.place_name} onFocus={onFocusLocInput} id="desc" readOnly />
          </InputWrapper>
          <InputWrapper>
            <Label>?????? ??????</Label>
            <Input placeholder="?????? ????????? ??????????????????" value={title} onChange={onChange} id="title" />
          </InputWrapper>
          <InputWrapper>
            <Label>?????? ??????</Label>
            <Input placeholder="?????? ????????? ??????????????????" value={desc} onChange={onChange} id="desc" />
          </InputWrapper>
          <SelectBoxWrapper>
            <Label>?????? ??????</Label>
            <SeqBox>{schdule.seq}??????</SeqBox>
          </SelectBoxWrapper>
          <ButtonWrapper>
            <EditAndCreateButton
              text="?????? ?????? ????????????"
              btnColor="orange"
              onClick={onClickSubmitButton}
            />
          </ButtonWrapper>
        </Wrapper>
      </Container>
    );
  } else {
    return <></>;
  }
}
