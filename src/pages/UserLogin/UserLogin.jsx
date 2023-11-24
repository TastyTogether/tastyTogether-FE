import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './style/UserLogin.style';
import axios from '../../utils/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth, setIsLogin } = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await axios({
                method: 'post',
                url: '/auth/login',
                data: {
                    email,
                    password,
                },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            setAuth(() => {
                return { ...response.data };
            });
            setIsLogin(true);

            localStorage.setItem('accessToken', response.data.accessToken);

            if (location?.state?.from) {
                return navigate('/');
            }
            navigate(-1);
        } catch (err) {
            setErrMsg(err.response.data.message);
        }
    };

    return (
        <S.Bg>
            <S.LoginBox>
                <S.Title>Login</S.Title>
                <S.Form onSubmit={login}>
                    <S.Input
                        name="email"
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email"
                        value={email}
                    />
                    <S.Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                    />
                    <S.ErrorMsg isErr={errMsg}>{errMsg}</S.ErrorMsg>
                    <S.SubmitBtn type="submit">Login</S.SubmitBtn>
                </S.Form>
                <S.SignupText>
                    아직 계정이 없으신가요?{' '}
                    <S.Signup onClick={() => navigate('/users/signup')}>회원 가입하기</S.Signup>
                </S.SignupText>
            </S.LoginBox>
        </S.Bg>
    );
}
