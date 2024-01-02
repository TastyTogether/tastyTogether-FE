import axios from '../../utils/axios';
import React, { useState, useMemo, useEffect } from 'react';
import * as S from './style/SearchResult.style';
import SortFilter from '../../components/SearchResult/SortFilter';
import { useNavigate, useParams } from 'react-router-dom';
import ResultNotice from '../../components/SearchResult/ResultNotice';
import SearchResultItem from '../../components/SearchResult/SearchResultItem';
import FilteredMap from '../../components/SearchResult/FilteredMap';

export default function SearchResult() {
    const navigate = useNavigate();
    useEffect(() => {
        if (currentPageItems.length === 0) return;
    });
    const { keyword } = useParams();

    const [selectedSort, setSelectedSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // 서버에서 정렬된 검색데이터
    const [stores, setStores] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/stores/search?keyword=${keyword}`);
            const data = res.data;
            setStores(data);
        };
        getData();
    }, [keyword]);

    const applySearchAndSort = useMemo(() => {
        let searchData = [...stores];
        // 정렬버튼 클릭 시 정렬됨.
        if (selectedSort === '평점순') {
            searchData.filter((item) => item.starRating !== undefined);
            return searchData.sort((a, b) => (b.starRating || 0) - (a.starRating || 0));
        } else if (selectedSort === '리뷰순') {
            searchData.filter((item) => item.storeReviewCount !== undefined);
            return searchData.sort((a, b) => (b.storeReviewCount || 0) - (a.storeReviewCount || 0));
        } else if (selectedSort === '찜한순') {
            searchData.filter((item) => item.storeLikeCount !== undefined);
            return searchData.sort((a, b) => (b.storeLikeCount || 0) - (a.storeLikeCount || 0));
        } else {
            return searchData;
        }
    }, [stores, selectedSort]);
    //페이지 별로 결과 출력
    const pageItems = useMemo(() => {
        if (keyword.trim() !== '') {
            return applySearchAndSort;
        } else {
            return stores;
        }
    }, [applySearchAndSort, keyword.trim(), stores]);

    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageItems = pageItems.slice(startIndex, endIndex);
    const pageCount = Math.ceil(pageItems.length / itemsPerPage);

    const [clickedStore, setClickedStore] = useState(null);

    useEffect(() => {
        if (clickedStore) {
            navigate(`/stores/detail/${clickedStore._id}`, {
                state: { storeId: clickedStore._id },
            });
        }
    }, [clickedStore]);
    return (
        <S.Container>
            <S.Search>
                <S.ResultDiv>
                    <SortFilter setSelectedSort={setSelectedSort} />
                    <FilteredMap currentPageItems={currentPageItems} />
                    <ResultNotice keyword={keyword} applySearchAndSort={applySearchAndSort} />
                    <S.ResultStores>
                        <S.Result>
                            {currentPageItems.map((item, index) => {
                                if (keyword.trim() !== '') {
                                    return (
                                        <SearchResultItem
                                            key={item._id}
                                            index={(currentPage - 1) * itemsPerPage + index} // 정확한 인덱스 계산 필요
                                            item={item}
                                            id={item._id}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </S.Result>
                        <S.Pagination>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                이전
                            </button>
                            <span>
                                {currentPage} / {pageCount}
                            </span>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage >= pageCount}
                            >
                                다음
                            </button>
                        </S.Pagination>
                    </S.ResultStores>
                </S.ResultDiv>
            </S.Search>
        </S.Container>
    );
}
