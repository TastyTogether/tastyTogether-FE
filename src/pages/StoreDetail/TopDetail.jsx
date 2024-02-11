import React from 'react';
import * as S from './style/TopDetail.style';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';

export default function TopDetail({
    storeInfo,
    storeReviewCount,
    storeLikes,
    storeReview,
    setStoreLikes,
}) {
    const navigate = useNavigate();
    const { name, type, starRating, address, banners } = storeInfo;
    const bottomPhotoList = banners && banners.slice(1);
    const reviewPhotos = storeReview && storeReview.map((el) => el.photos);
    const reviewPhotoList = [].concat(...reviewPhotos);
    const { authRequiredAxios } = useAxios('application/json');
    const { isLogin, auth } = useAuth();

    const clickBookMarkBtn = async () => {
        if (!isLogin) {
            navigate(`/users/login`);
            return;
        }
        const res = await authRequiredAxios({
            method: 'patch',
            url: `/stores/${storeInfo._id}/storelikes`,
        });
        const data = res.data;
        setStoreLikes(data);
    };
    const clickReviewBtn = async () => {
        if (!isLogin) {
            navigate(`/users/login`);
            return;
        }
        navigate(`/review/${storeInfo._id}`, {
            state: { storeId: storeInfo._id, name: storeInfo.name },
        });
        return;
    };
    const clickMateBtn = async () => {
        if (!isLogin) {
            navigate(`/users/login`);
            return;
        }
        navigate(`/post/create`);
        return;
    };

    return (
        <S.TopDetailWrap>
            <S.StoreBanners>
                <S.StoreLeftImgs>
                    <S.StoreLeftTopImg src={banners && banners[0]} />
                    <S.StoreLeftBottomImgs>
                        {banners &&
                            new Array(3).fill(null).map((_, idx) => {
                                const photoIndex = idx % bottomPhotoList.length;
                                const bottomPhoto = bottomPhotoList[photoIndex];
                                return <S.GridImg key={idx} src={bottomPhoto} alt="storeImg" />;
                            })}
                    </S.StoreLeftBottomImgs>
                </S.StoreLeftImgs>
                <S.StoreRightImgs>
                    {storeReview.length > 0
                        ? new Array(4).fill(null).map((_, idx) => {
                              const photoIndex = idx % reviewPhotoList.length;
                              const reviewPhoto = reviewPhotoList[photoIndex];
                              return (
                                  <S.GridImg
                                      isRight={true}
                                      key={idx}
                                      src={reviewPhoto}
                                      alt="storeImg"
                                  />
                              );
                          })
                        : null}
                </S.StoreRightImgs>
            </S.StoreBanners>
            <S.StoreName>{name}</S.StoreName>
            <S.StoreRegionAndType>
                <S.StoreRegion>{address && address.state}</S.StoreRegion>
                <S.StoreRegionBar>|</S.StoreRegionBar>
                <S.StoreType>{type}</S.StoreType>
            </S.StoreRegionAndType>
            <S.ScoreInfo>
                <S.ScoreLeft>
                    <S.StarAverage>{starRating}</S.StarAverage>
                    <S.StarAverageCount>{`(${storeReviewCount}명의 평가)`} /</S.StarAverageCount>
                    <S.LikesSymbol src={'/imgs/orageBookmarkIcon.png'} />
                    <S.LikesCount>{`(${storeLikes.length})`}</S.LikesCount>
                </S.ScoreLeft>
                <S.ViewInfo>
                    <S.ViewIcon src={'/imgs/viewIcon.png'} />
                    <S.ViewText>{`${storeInfo.viewCount}명이 봤어요`}</S.ViewText>
                </S.ViewInfo>
                <S.DividerLine></S.DividerLine>
            </S.ScoreInfo>
            <S.TopBtns>
                <S.TopBtn type="button" isBook={true} onClick={clickBookMarkBtn}>
                    <S.TopBtnIcon
                        src={
                            storeLikes && storeLikes.includes(auth.userId)
                                ? '/imgs/orageBookmarkIcon.png'
                                : '/imgs/bookmarkIcon.png'
                        }
                        isBook={true}
                    />
                    <S.TopBtnText isBook={true}>북마크 추가</S.TopBtnText>
                </S.TopBtn>
                <S.TopBtn type="button" onClick={clickReviewBtn}>
                    <S.TopBtnIcon src={'/imgs/reviewIcon.png'} />
                    <S.TopBtnText>리뷰 쓰기</S.TopBtnText>
                </S.TopBtn>
                <S.TopBtn type="button" onClick={clickMateBtn}>
                    <S.TopBtnIcon src={'/imgs/mateIcon.png'} />
                    <S.TopBtnText>메이트 구하기</S.TopBtnText>
                </S.TopBtn>
            </S.TopBtns>
        </S.TopDetailWrap>
    );
}
