import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';
import KakaoMap from './KakaoMap';
import * as S from './style/LeftBanner.style';

export default function LeftBanner({ storeName, storeAddress }) {
    const navigate = useNavigate();
    const { latitude, longitude, city, state } = storeAddress;
    const [board, setBoard] = useState([]);
    const keyword = `${city} ${state}`;
    const { isLogin } = useAuth();

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`regionSearch?value=${keyword}`);
            const data = res.data;
            setBoard(data[0]);
        };
        getPost();
    }, []);
    return (
        <S.LeftBannerWrapper>
            <S.MiniMap>
                <S.MapImage>
                    <KakaoMap
                        storeName={storeName && storeName}
                        latitude={latitude}
                        longitude={longitude}
                    ></KakaoMap>
                </S.MapImage>
                <S.MapInfoTitle>{storeName}</S.MapInfoTitle>
                <S.Navi isMap={true}>
                    <S.NaviText isMap={true}>맛집으로 길찾기 하고 싶다면?</S.NaviText>
                    <S.NaviBtn
                        onClick={() =>
                            window.open(
                                `https://map.kakao.com/link/to/${storeName},${latitude},${longitude}`,
                            )
                        }
                    >
                        Go
                    </S.NaviBtn>
                </S.Navi>
            </S.MiniMap>
            {board && (
                <S.MatePost>
                    <S.MatePostTitle>{board && board.title}</S.MatePostTitle>
                    <S.TitleLine></S.TitleLine>
                    <S.MatePostCotent>{board && board.content}</S.MatePostCotent>
                    <S.Navi>
                        <S.NaviText>위의 메이트와 약속을 잡고 싶다면?</S.NaviText>
                        <S.NaviBtn
                            onClick={() => {
                                if (!isLogin) {
                                    navigate(`/users/login`);
                                    return;
                                }
                                navigate(`/post/${board._id}`);
                            }}
                        >
                            Go
                        </S.NaviBtn>
                    </S.Navi>
                </S.MatePost>
            )}
            {!board && (
                <S.MatePost>
                    <S.NonePostContent>
                        해당되는 지역의
                        <br /> 메이트 게시글이 없습니다.☹︎
                    </S.NonePostContent>
                    <S.TitleLine isNone={true}></S.TitleLine>
                    <S.Navi>
                        <S.NaviText>메이트 게시글을 쓰고 싶다면?</S.NaviText>
                        <S.NaviBtn onClick={() => navigate(`/post/create`)}>Go</S.NaviBtn>
                    </S.Navi>
                </S.MatePost>
            )}
        </S.LeftBannerWrapper>
    );
}
