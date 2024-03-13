import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './style/StoreDetail.style';
import TopDetail from './TopDetail';
import BottomDetail from './BottomDetail';
import LeftBanner from './LeftBanner';
import Reviews from '../../components/Reviews/Reviews';
import axios from '../../utils/axios';

export default function StoreDetail() {
    const [storeInfo, setStoreInfo] = useState({});
    const [storeReviewCount, setStoreReviewCount] = useState(0);
    const [storeLikes, setStoreLikes] = useState([]);
    const [storeReview, setStoreReview] = useState([]);
    const [storeReviews, setStoreReviews] = useState([]);
    const location = useLocation();
    const currentPath = location.pathname;
    const storeId = currentPath.split('/')[3];

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/stores/${storeId}`);
            const data = res.data;
            setStoreInfo(data.storeInfo);
            setStoreLikes(data.storeInfo.storeLikes);
            setStoreReviewCount(data.storeReviewCount);
            setStoreReview(data.storeInfo.reviews);
            setStoreReviews(data.newStoreReviews);
        };
        getData();
    }, []);

    return (
        <>
            <S.Container>
                <S.Main>
                    <TopDetail
                        storeInfo={storeInfo}
                        storeLikes={storeLikes}
                        storeReviewCount={storeReviewCount}
                        storeReview={storeReview}
                        setStoreLikes={setStoreLikes}
                    ></TopDetail>
                    <BottomDetail storeInfo={storeInfo}></BottomDetail>
                    <Reviews reviews={storeReviews}></Reviews>
                </S.Main>
                {storeInfo.address && (
                    <LeftBanner
                        storeName={storeInfo.name}
                        storeAddress={storeInfo.address}
                    ></LeftBanner>
                )}
            </S.Container>
        </>
    );
}
