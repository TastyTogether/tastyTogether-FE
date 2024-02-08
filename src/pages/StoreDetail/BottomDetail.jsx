import React from 'react';
import * as S from './style/BottomDetail.style';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function BottomDetail({ storeInfo }) {
    const navigate = useNavigate();
    const { isLogin } = useAuth();
    const { address, phone, menuItems, priceRange, parkingInfo, businessHours, closedDays } =
        storeInfo;

    const infoEditBtn = async () => {
        if (!isLogin) {
            navigate(`/users/login`);
            return;
        }
        navigate(`/stores/detail/${storeInfo._id}/edit`, { state: { storeInfo: storeInfo } });
        return;
    };
    return (
        <S.BottomDetailWrap>
            <S.StoreDetailBox>
                <S.AddressDetail>
                    <S.AddressTitle>주소</S.AddressTitle>
                    <S.Addresses>
                        <S.AddressContent>{address && address.street}</S.AddressContent>
                        <S.AddressStreets>
                            <S.AddressStreetIcon>지번</S.AddressStreetIcon>
                            <S.AddressStreet>{address && address.fullAddress}</S.AddressStreet>
                        </S.AddressStreets>
                    </S.Addresses>
                </S.AddressDetail>
                <S.StoreDetailItem>
                    <S.StoreDetailTitle>전화번호</S.StoreDetailTitle>
                    <S.StoreDetailContent>{phone}</S.StoreDetailContent>
                </S.StoreDetailItem>
                <S.StoreDetailItem>
                    <S.StoreDetailTitle>가격대</S.StoreDetailTitle>
                    <S.StoreDetailContent>{priceRange}</S.StoreDetailContent>
                </S.StoreDetailItem>
                <S.StoreDetailItem>
                    <S.StoreDetailTitle>주차</S.StoreDetailTitle>
                    <S.StoreDetailContent>{parkingInfo}</S.StoreDetailContent>
                </S.StoreDetailItem>
                <S.StoreDetailItem>
                    <S.StoreDetailTitle>영업시간</S.StoreDetailTitle>
                    <S.StoreDetailContent>
                        {businessHours &&
                            `오전 ${businessHours[0]}:${businessHours[1]}~ 오후 ${businessHours[2]}:${businessHours[3]}`}
                    </S.StoreDetailContent>
                </S.StoreDetailItem>
                <S.StoreDetailItem>
                    <S.StoreDetailTitle>휴무일</S.StoreDetailTitle>
                    <S.StoreDetailContent>{closedDays}</S.StoreDetailContent>
                </S.StoreDetailItem>
                <S.StoreDetailItem>
                    <S.StoreDetailTitle>대표 메뉴</S.StoreDetailTitle>
                    <S.MenuItems>
                        {menuItems &&
                            menuItems.map((el) => {
                                return (
                                    <>
                                        <S.MenuItem>
                                            <S.StoreDetailContent>{el.name}</S.StoreDetailContent>
                                            <S.StoreDetailContent>
                                                {Number(el.price).toLocaleString()}원
                                            </S.StoreDetailContent>
                                        </S.MenuItem>
                                        <S.MenuDividerLine></S.MenuDividerLine>
                                    </>
                                );
                            })}
                    </S.MenuItems>
                </S.StoreDetailItem>
            </S.StoreDetailBox>
            <div>
                <S.StoreEditLink onClick={infoEditBtn}>정보 수정하기 &#62;</S.StoreEditLink>
            </div>
        </S.BottomDetailWrap>
    );
}
