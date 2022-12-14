import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";
import { BudgetsState } from "../../modules/budget";

type BudgetListProps = {
  budgetData?: BudgetsState
}

const Container = styled.div`
  
`

const BudgetBox = styled.div`
  background: #f9f9f9;
  border: 1px solid #ededed;
  border-radius: 15px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 102px;
`;

const SumBox = styled.div`
  background: #f9f9f9;
  border: 1px solid #ededed;
  border-radius: 15px;
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BoxLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GrayText = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: #969696;
`;

const Sum = styled.div`
  font-size: 24px;
  line-height: 25px;
  font-family: "SUIT-700";
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainText = styled.div`
  font-size: 18px;
  line-height: 20px;
`;

const SubText = styled.div`
  font-size: 18px;
  line-height: 20px;
  text-align: right;
  color: #969696;
`;

const ReplaceText = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: #BFBFBF;
  font-family: 'SUIT-400';
`

export default function BudgetList({ budgetData }: BudgetListProps) {
  const router = useRouter();
  const budgets = useSelector((state: RootState) => state.budget);
  const selectedBudget = budgets.filter(item => item.isSelected)[0];
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(0);
    if(budgetData) {
      budgetData.map(budget => {
        setSum(sum => sum + budget.budget);
      });
    } else {
      budgets.map(budget => {
        setSum(sum => sum + budget.budget);
      });
    }
  }, [selectedBudget, budgetData ? budgetData.length : budgets.length]);

  return (
    <Container>
      <SumBox>
        <BoxLeftWrapper>
          <GrayText>??? ?????? ??????</GrayText>
          <Sum>{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</Sum>
        </BoxLeftWrapper>
        {router.pathname === "/plan" && <img src="/images/edit-3.svg" />}
      </SumBox>
      <BudgetBox>
        {router.pathname === "/plan" && budgets.length ? 
          <>
            {budgets.map(budget => (
              <TextWrapper key={budget.id}>
                <MainText>{budget.title}</MainText>
                <SubText>{budget.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</SubText>
              </TextWrapper>
            ))}
          </>
        : router.pathname === "/plan" && !budgets.length ? 
          <ReplaceText>????????? ????????? ??????????????????...</ReplaceText>
        :
          <>
            {budgetData?.map(budget => (
              <TextWrapper key={budget.id}>
                <MainText>{budget.title}</MainText>
                <SubText>{budget.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</SubText>
              </TextWrapper>
            ))}
          </>
        }
      </BudgetBox>
    </Container>
    
  );
}
