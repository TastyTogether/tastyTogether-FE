import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh; // 페이지 높이를 100vh로 설정하여 스크롤을 내려야 footer가 보이게 설정
    margin-top: 100px; // 헤더의 포지션이 fixed여서 margin-top 값을 Header 높이 만큼 설정
    padding: 69px 0px 69px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RegisterFormTitle = styled.div`
    width: calc(100% - 20px);
    max-width: 1044px;
    height: 88px;
    border-radius: 5px 5px 0px 0px;
    background-color: #ff914d;
    color: #fff;
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    line-height: 88px;
`;

export const RegisterForm = styled.form`
    width: calc(100% - 20px);
    max-width: 1044px;
    margin: 0 auto;
    height: 50%;
    border-radius: 0px 0px 5px 5px;
    background: #fff;
    padding: 75px 24px 51px 24px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    > div {
        display: grid;
        grid-template-columns: 178px auto;
        grid-template-rows: minmax(24px, auto);
    }
`;

export const EditContentBox = styled.div`
    display: flex;
    margin-left: 62px;
    > div {
        display: flex;
        gap: ${(props) => (props.isSmallGap ? '14px' : '32px')};
    }
`;

export const EditTitle = styled.div`
    color: #989797;
    font-size: 20px;
    font-weight: 700;
`;

export const StoreLocatorRegistration = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const InputBox = styled.input`
    width: 448px;
    height: 32px;
    border: 1px solid #989797;
    border-radius: 5px;
    margin-top: -4px;
    text-indent: 18px;
    line-height: 32px;
    font-size: 15px;

    &:focus {
        outline: 2px solid rgba(255, 145, 77, 0.6);
    }
    &::placeholder {
        color: #989797;
        font-size: 15px;
        text-indent: 18px;
    }
`;

export const SearchBtn = styled.label`
    width: 78px;
    height: 32px;
    border: 1px solid #ff914d;
    border-radius: 5px;
    margin-top: -4px;
    background: #ff914d;
    color: #fff;
`;

export const MapPopup = styled.div`
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 100;
`;

export const MapImage = styled.div`
    width: 537px;
    height: 274px;
    background: #ff914d;
`;

export const RegistrationStatusMessage = styled.div`
    color: #ff914d;
    font-size: 15px;
`;

export const InputLabel = styled.label`
    display: flex;
    gap: 11px;
    color: #989797;
    line-height: 18px;
    font-size: 17px;
    font-weight: 400;
`;

export const RadioDesign = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #d9d9d9;
`;

export const RadioInput = styled.input`
    display: none;
    &:checked + div {
        &::after {
            content: '';
            display: block;
            margin: 4px;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            background-color: #ff914d;
        }
    }
`;

export const TimeInput = styled.input`
    width: 42px;
    height: 29px;
    border: none;
    border-bottom: 1px solid #989797;
    margin-top: -6px;
    text-align: center;
    font-size: 15px;
    color: #ff9c5f;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #989797;
        font-size: 15px;
    }
`;

export const ClosedDayDesign = styled.div`
    width: 21px;
    height: 21px;
    border-radius: 5px;
    border: 1px solid #989797;
`;

export const ClosedDayInput = styled.input`
    display: none;
    margin-top: -6px;
    &:checked + div {
        &::after {
            content: '✔';
            display: block;
            text-align: center;
            color: #ff914d;
        }
    }
`;

export const MenuNameChart = styled.table`
    width: 275px;
    height: 168px;
    border-collapse: collapse;
`;

export const ChartHead = styled.th`
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    background-color: #ff914d;
    border-top-left-radius: ${({ isLeft }) => (isLeft ? '5px' : '0px')};
    border-top-right-radius: ${({ isLeft }) => (isLeft ? '0px' : '5px')};
    height: 36px;
`;

export const ChartContent = styled.td`
    border: 1px solid #989797;
    text-align: center;
    color: #989797;
    font-size: 15px;
    font-weight: 700;

    &:first-child {
        border-top: none;
    }
`;

export const ChartInput = styled.input`
    height: 42px;
    border: none;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    &::placeholder {
        color: #989797;
        font-size: 13px;
        text-align: center;
    }
    &:focus {
        outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const DividerLine = styled.hr`
    width: 90%;
    height: 1px;
    background: #d9d9d9;
    border: 0;
    align-self: center;
`;

export const EditFormBtn = styled.button`
    width: 211px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid ${({ isOrange }) => (isOrange ? '#ff914d' : ' #989797')};
    background: ${({ isOrange }) => (isOrange ? '#ff914d' : '#FFF')};
    text-align: center;
    color: ${({ isOrange }) => (isOrange ? '#fff' : '#989797')};
    font-size: 17px;
    font-weight: 400;
`;

export const EditFormBtns = styled.div`
    display: flex;
    padding-left: 250px;
    padding-right: 250px;
    justify-content: space-between;
`;
