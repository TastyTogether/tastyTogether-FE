import React from 'react';
import * as S from './style/NoInfo.style';

export default function NoInfo() {
    return (
        <S.Container>
            <S.Icon />
            <S.TopP>검색 결과가 없습니다.</S.TopP>
            <S.BottomP>
                알고 있는 장소가 검색결과에 없다면
                <br />
                직접 장소를 등록해보세요!
            </S.BottomP>
            <S.LinkBtn to="/stores/register">신규 장소 등록</S.LinkBtn>
        </S.Container>
    );
}
