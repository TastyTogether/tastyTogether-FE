import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Bg = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, var(--color-accent), white);
`;

export const LoginBox = styled.div`
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    position: relative;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
`;

export const Title = styled.h1`
    color: black;
    font-size: 40px;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const Form = styled.form`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width: 90%;
    height: 15%;
    background-color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 0 25px;
    transition: all 250ms ease-out;
    border-radius: 2rem;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    &:hover,
    &:focus {
        border: 1px solid var(--color-accent);
    }
    &:nth-of-type(1) {
        margin: 10% auto 2.5%;
    }
    &:nth-of-type(2) {
        margin: 2.5% auto 5%;
    }
`;

export const ErrorMsg = styled.p`
    width: 100%;
    height: 5%;
    color: red;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    visibility: ${(props) => (props.isErr === '' ? 'hidden' : 'visible')};
`;

export const SubmitBtn = styled.button`
    width: 90%;
    height: 15%;
    background-color: black;
    border: none;
    border-radius: 2rem;
    font-size: 22px;
    color: white;
    font-weight: bold;
    transition: 0.1s;
    margin: 5% auto;
    &:hover {
        background-color: rgba(255, 145, 77);
        transition: 0.3s;
    }
`;

export const LinkToSignUp = styled(Link)`
    width: 300px;
    height: 50px;
    background-color: rgba(160, 160, 160, 0.7);
    border: none;
    border-radius: 10px;
    font-size: 17px;
    color: white;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    &:hover {
        background-color: rgba(160, 160, 160);
        transition: 0.3s;
    }
`;

export const SignupText = styled.p`
    font-weight: 400;
    color: black;
    font-size: 18px;
    height: 20%;
`;

export const Signup = styled.span`
    text-decoration-line: underline;
    font-weight: 600;
    cursor: pointer;
`;
