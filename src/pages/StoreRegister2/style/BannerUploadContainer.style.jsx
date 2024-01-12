import styled from 'styled-components';

export const BannerUploadContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const BannerUploadLabel = styled.label`
    width: 114px;
    height: 27px;
    border: ${(props) => (props.isCancleBtn ? '0.5px' : 'none')};
    border-top: 0.5px solid #989797;
    border-right: 0.5px solid #989797;
    border-left: 0.5px solid #989797;
    border-radius: 5px 5px 0px 0px;
    background: ${(props) => (props.isCancleBtn ? 'none' : '#989797')};
    padding: 5.4px 18.5px;
    color: ${(props) => (props.isCancleBtn ? '#989797' : '#fff')};
    text-align: center;
    font-size: 13px;
    cursor: pointer;
`;

export const BannerUploadInput = styled.input`
    display: none;
`;

export const BannerUploadNotification = styled.div`
    color: #989797;
    font-size: 13px;
    padding: 5px 13px;
`;

export const BannerUploadImageBox = styled.div`
    width: 563px;
    min-height: 249px;
    border-radius: 0px 5px 5px 5px;
    border: 0.5px solid #989797;
    margin-top: -1px;
    padding: 14px 16px;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
`;

export const BannerUploadImagePreview = styled.img`
    width: 117px;
    height: 103px;
    background-color: black;
`;
