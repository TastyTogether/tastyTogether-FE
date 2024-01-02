import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as S from './style/Banner.style';
import useAxios from '../../hooks/useAxios';

export default function Banner() {
    const { authRequiredAxios } = useAxios('application/json');
    const [text, setText] = useState('');
    const [photos, setPhotos] = useState();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            return;
        }
        navigate(`/stores/search/${text}`);
    };
    useEffect(() => {
        try {
            const getBanner = async () => {
                const res = await authRequiredAxios({ method: 'get', url: '/banner' });
                const data = await res.data.bannerImages;
                setPhotos(data);
            };
            getBanner();
        } catch (err) {
            console.err(err);
        }
    }, []);
    return (
        <S.Container photos={photos && photos[0]}>
            <S.TextContainer>
                <S.Title>
                    솔직한 리뷰, 믿을 수 있는 평점! <br /> TASTY TOGETHER
                </S.Title>
            </S.TextContainer>
            <S.Form onSubmit={handleSubmit}>
                <S.Search
                    type="search"
                    value={text}
                    onChange={handleChange}
                    placeholder="지역, 식당 또는 음식을 입력해주세요"
                />
                <S.SubmitBtn>
                    <FiSearch />
                </S.SubmitBtn>
            </S.Form>
        </S.Container>
    );
}
