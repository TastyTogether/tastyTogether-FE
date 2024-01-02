import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style/StoreItem.style';

export default function StoreItem({ store }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/stores/detail/${store._id}`);
    };

    return (
        <S.Item key={store._id} onClick={handleClick}>
            <S.ItemLeft>
                <S.ItemImg src={store.banners[0]} alt="음식점 이미지" />
            </S.ItemLeft>
            <S.ItemCenter>
                <S.Name>{store.name}</S.Name>
                <S.Category>{store.type}</S.Category>
                <S.Tags>
                    <S.Tag>#{store.parkingInfo}</S.Tag>
                    <S.Tag>
                        {store.closedDays.length == 1 ? '#' : '#정기휴무:'}
                        {store.closedDays.map((day, index) => {
                            if (day === '연중무휴') {
                                return day;
                            }
                            return `${day}요일 `;
                        })}
                    </S.Tag>
                    <S.Tag>#{store.priceRange}</S.Tag>
                </S.Tags>
                <S.Icons>
                    <S.Icon>
                        <S.StarIcon /> {store.starRating}
                    </S.Icon>
                    <S.Icon>
                        리뷰
                        {store.reviews.length}
                    </S.Icon>
                    <S.Icon>
                        <S.BookMarkIcon />
                        {store.storeLikes.length}
                    </S.Icon>
                </S.Icons>
            </S.ItemCenter>
            <S.ItemRight>
                <S.ItemAddress>{`${store.address.city} ${store.address.state}`}</S.ItemAddress>
            </S.ItemRight>
        </S.Item>
    );
}
