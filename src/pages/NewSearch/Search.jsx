import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import NoInfo from '../../components/NewSearch/NoInfo';
import OrderFilters from '../../components/NewSearch/OrderFilters';
import StoreItems from '../../components/NewSearch/StoreItems';
import SearchMap from '../../components/NewSearch/SearchMap';
import * as S from './style/Search.style';
import ArrowUpBtn from '../../components/NewSearch/style/ArrowUpBtn';

const filters = ['평점순', '리뷰순', '찜한순'];
export default function Search() {
    const [filter, setFilter] = useState(filters[0]);
    const { keyword } = useParams();
    const getStoreItem = async () => {
        const res = await axios.get(`/stores/search?keyword=${keyword}`);
        if (res.data.length === 0) {
            return undefined;
        }
        return res.data;
    };
    const { isLoading, error, data: stores } = useQuery(['stores', keyword], getStoreItem);
    if (error) {
        console.error(error);
    }
    const [showButton, setShowButton] = useState('hidden');
    const handleWheel = () => {
        if (window.scrollY > 300) {
            setShowButton('show');
        } else {
            setShowButton('hidden');
        }
    };
    return (
        <S.Container content={stores} onWheel={handleWheel}>
            <S.SearchContainer>
                {isLoading && <S.Loading>로딩중...</S.Loading>}
                <OrderFilters filters={filters} filter={filter} onFilterChange={setFilter} />
                {stores && <SearchMap currentPageItems={stores}></SearchMap>}
                {!stores && <NoInfo />}
                <S.ResultComment>{keyword}에 대한 검색결과입니다</S.ResultComment>
                <StoreItems stores={stores} filter={filter} />
            </S.SearchContainer>
            <ArrowUpBtn show={showButton} setShow={setShowButton} />
        </S.Container>
    );
}
