import styled from 'styled-components';

export const BannerUploadContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const BannerUploadLabel = styled.label`
    width: 114px;
    height: 27px;
    border: ${({ isCancleBtn }) => (isCancleBtn ? '0.5px' : 'none')};
    border-top: 0.5px solid #989797;
    border-right: 0.5px solid #989797;
    border-left: 0.5px solid #989797;
    border-radius: 5px 5px 0px 0px;
    background: ${({ isCancleBtn }) => (isCancleBtn ? 'none' : '#989797')};
    padding: 5.4px 18.5px;
    color: ${({ isCancleBtn }) => (isCancleBtn ? '#989797' : '#fff')};
    text-align: center;
    font-size: 13px;
    cursor: pointer;
`;

export const BannerUploadInput = styled.input`
    display: none;
`;

export const CancleAllUploadButton = styled.input`
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

export const UploadImagePreviewContainer = styled.div`
    width: 117px;
    height: 103px;
    position: relative;

    &:hover {
        opacity: 30%;
        button {
            display: block;
        }
    }
`;

export const UploadImagePreview = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

export const uploadImageDeleteButton = styled.button`
    width: 25px;
    height: 25px;
    display: none;
    position: absolute;
    background-color: transparent;
    border: none;
    top: 3px;
    right: 7px;
`;

export const DeleteButtonIcon = styled.img`
    width: 100%;
    height: 100%;
`;
