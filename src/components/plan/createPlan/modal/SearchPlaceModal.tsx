import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { unsetActive } from "../../../../modules/isActive";
import { addPlace } from "../../../../modules/currentData";
import EditAndCreateButton from "../../../templates/EditAndCreateButton";
import SearchBar from "../../../templates/SearchBar";

const KAKAO_LOCALAPI_ROUTE = "/v2/local/search/keyword.json"
const KAKAO_URL = "//dapi.kakao.com"

export interface DocData {
  address_name: string;
  // category_group_code: string;
  // category_group_name: string;
  // category_name: string;
  // distance: string;
  id: string;
  // phone: string;
  place_name: string;
  // place_url: string;
  // road_address_name: string;
  x: string;
  y: string;
}

const Container = styled.div`
  background: #ffffff;
  padding: 25px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
  min-height: 
`;

const MainText = styled.div`
  font-size: 22px;
  line-height: 35px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

const SearchResultField = styled.div`
  flex: 1;
  margin-bottom: 69.5px;
`

const SearchBeforeWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`

const BeforeGrayText = styled.div`
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #B0B0B0;
  font-family: 'SUIT-500';
  text-align: center;
`

const BeforeGrayBoldText = styled.div`
  font-family: 'SUIT-600';
`

const SearchAfterWrapper = styled.div`
  margin-top: 30px;
  height: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
`

const AfterTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const DescText = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: #AFAFAF;
`

const SearchResultList = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: ${props => props.height - 244.5}px;
  overflow: scroll;
  margin-bottom: 100px;
`

const SearchResultItem = styled.div<{ selectedPlaceIdx: number, idx: number }>`
  background: ${props => props.selectedPlaceIdx === props.idx ? "#FFDFCD" : "#F9F9F9"};
  border: ${props => props.selectedPlaceIdx === props.idx ? "1px solid #FF833E" : "1px solid #EDEDED"};
  border-radius: 12px;
  padding: 16px 15px;
  display: flex;
  gap: 7px;
  flex-direction: column;
`

const PlaceText = styled.div`
  font-size: 18px;
  line-height: 25px;
  color: #010101;
`

const AddressText = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: #A0A0A0;
  font-family: 'SUIT-500';
`

const ButtonWrapper = styled.div`
  padding: 25px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0;
  background: #FFFFFF;
`;

const Button = styled.div`
  width: 100%;
  display: flex;
`

export default function SearchPlaceModal() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [places, setPlaces] = useState<DocData[]>([]);
  const [selectedPlaceIdx, setSelectedPlaceIdx] = useState(-1);

  const onClickCancelButton = () => {
    dispatch(unsetActive("searchPlace"));
    setAddress("");
    setPlaces([]);
    setSelectedPlaceIdx(-1);
  };

  const onClickSearchButton = async () => {
    const data = await axios.get(`${KAKAO_URL}${KAKAO_LOCALAPI_ROUTE}?query=${address}&size=15`, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
    });
    console.log(data.data.documents);
    setPlaces(data.data.documents);
  }

  const onClickPlaceItem = (idx: number) => {
    setSelectedPlaceIdx(idx);
  }

  const onClickSubmitButton = () => {
    const data: DocData = {
      address_name: places[selectedPlaceIdx].address_name,
      id: places[selectedPlaceIdx].id,
      place_name: places[selectedPlaceIdx].place_name,
      x: places[selectedPlaceIdx].x,
      y: places[selectedPlaceIdx].y,
    }
    dispatch(addPlace(data));
    dispatch(unsetActive("searchPlace"));
    setAddress("");
    setPlaces([]);
    setSelectedPlaceIdx(-1);
  }

  return (
    <Container>
      <TopWrapper>
        <MainText>????????? ????????????<br />????????? ????????? ??????????????????</MainText>
        <img src="images/cancel.svg" onClick={onClickCancelButton} />
      </TopWrapper>
      <SearchBar searchType="address" text={address} setText={setAddress} onClick={onClickSearchButton} />
      <BottomWrapper>
        <SearchResultField>
          {
            !places?.length
            ? 
            <SearchBeforeWrapper>
              <img src="images/explore.svg" />
              <BeforeGrayText>????????? ???????????????<br /><BeforeGrayBoldText>????????? ????????? ??? ?????????!</BeforeGrayBoldText></BeforeGrayText>
            </SearchBeforeWrapper>
            :
            <SearchAfterWrapper>
              <AfterTopWrapper>
                <DescText>?????? ????????????</DescText>
                <DescText>??? {places.length}???</DescText>
              </AfterTopWrapper>
              <SearchResultList height={window.innerHeight}>
                {places.map((place: DocData, idx: number) => (
                  <SearchResultItem key={place.id} onClick={() => onClickPlaceItem(idx)} selectedPlaceIdx={selectedPlaceIdx} idx={idx}>
                    <PlaceText>{place.place_name}</PlaceText>
                    <AddressText>{place.address_name}</AddressText>
                  </SearchResultItem>
                ))}
              </SearchResultList>
            </SearchAfterWrapper>
          }
        </SearchResultField>
        <ButtonWrapper>
          <Button>
            <EditAndCreateButton
              text="?????? ?????? ????????????"
              btnColor="orange"
              onClick={onClickSubmitButton}
            />
          </Button> 
        </ButtonWrapper>
      </BottomWrapper>
    </Container>
  );
}