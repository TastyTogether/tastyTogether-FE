import styled from 'styled-components';

export const LeftBannerWrapper = styled.div`
    flex: 1;
    height: auto;
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
    padding: 44px 46px 346px 215px;
`;

export const MiniMap = styled.div`
    width: 255px;
    height: 312px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 32px 19.5px 21px 19.5px;
`;

export const MapImage = styled.div`
    width: 216px;
    height: 207px;
    border-radius: 5px;
`;

export const MapInfoTitle = styled.h4`
    margin-top: 14px;
    width: 206px;
    line-height: 17px;
    color: #000;
    font-size: 14px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Navi = styled.div`
    display: flex;
    margin-top: ${({ isMap }) => (isMap ? '6px' : '20px')};
    margin-left: ${({ isMap }) => (isMap ? '0px' : '6px')};
    gap: 6px;
`;

export const NaviText = styled.p`
    color: #000;
    font-size: ${({ isMap }) => (isMap ? '12px' : '11px')};
    font-weight: 400;
`;

export const NaviBtn = styled.a`
    width: 28px;
    height: 15px;
    border-radius: 5px;
    background: rgba(255, 145, 77, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 9px;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
`;

export const MatePost = styled.div`
    width: 255px;
    height: 204px;
    background: #fff;
    border-radius: 10px;
    margin-top: 18px;
    padding: 31px 20px 23px 20px;
    display: flex;
    flex-direction: column;
`;

export const MatePostTitle = styled.h5`
    max-width: 195px;
    line-height: 15px;
    color: #000;
    align-self: center;
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const TitleLine = styled.div`
    width: 214px;
    height: 1px;
    background: #ff914d;
    margin-top: ${({ isNone }) => (isNone ? '40px' : '10px')};
`;

export const MatePostCotent = styled.p`
    color: #989797;
    width: 212px;
    height: 76px;
    font-size: 10px;
    font-weight: 400;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    text-align: left;
    margin-top: 12px;
`;

export const NonePostContent = styled.p`
    color: #989797;
    width: 176px;
    height: 36px;
    font-size: 15px;
    font-weight: 400;
    align-self: center;
    margin-top: 35px;
`;
