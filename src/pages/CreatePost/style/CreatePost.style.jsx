import styled, { css } from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const BoxContainer = styled.div`
    width: 80vw;
    height: 80vh;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(8, 12.5%);
    grid-template-areas:
        'box1 box1'
        'box2 box4'
        'box2 box4'
        'box2 box4'
        'box2 box4'
        'box3 box4'
        'box3 box4'
        'box5 box5';

    align-items: center;
    border-radius: 10px;
    background-color: #cfcccc;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const Box = styled.div`
    width: 80%;
    border: 1px solid #ff914d;
    background-color: white;
    border-bottom: none;
`;

export const Box1 = styled(Box)`
    grid-area: box1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    width: 100%;
    height: 100%;

    input[type='date'],
    input[type='text'] {
        margin-left: 10px;
        width: 300px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ff914d;
        text-align: center;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
    }

    label {
        margin-left: 5px;
    }
`;

export const Box2 = styled(Box)`
    grid-area: box2;

    @keyframes colorChange {
        from {
            background-color: #ffffff;
        }
        to {
            background-color: #ff914d;
            opacity: 0.7;
        }
    }

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    input[type='file'] {
        display: none;
    }
    span {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        border-radius: 10px;
        &:hover {
            animation-name: colorChange;
            animation-duration: 1s;
            animation-fill-mode: forwards;
        }
    }
`;

export const ImageUploadIcon = styled.div`
    font-size: 100px;
    color: black;
    cursor: pointer;
`;
export const Box3 = styled(Box)`
    grid-area: box3;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom: 1px solid #ff914d;
    textarea {
        width: 95%;
        height: 70%;
        border: none;
        resize: none;
        font-size: 20px;
        font-style: normal;
        display: flex;
        outline: none;
    }
`;

export const Box4 = styled(Box)`
    grid-area: box4;

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-left: none;
    border-bottom: 1px solid #ff914d;
    textarea {
        width: 95%;
        height: 90%;
        border: none;
        resize: none;
        font-size: 20px;
        font-style: normal;
        outline: none;
    }
`;
export const Btn = styled.div`
    grid-area: box5;
    display: flex;
    justify-content: space-around;
    border: none;
    background-color: #cfcccc;
`;

const buttonStyles = css`
    width: 345px;
    height: 55px;
    font-size: 20px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
`;

export const ButtonCancel = styled.button`
    ${buttonStyles}
    background-color: #848484;

    &:hover {
        background-color: #4e4e4e;
    }
    margin-right: 10px;
`;

export const ButtonSubmit = styled.button`
    ${buttonStyles}
    background-color: #ff914d;
    opacity: 90%;

    &:hover {
        background-color: #e57f42;
    }
`;
