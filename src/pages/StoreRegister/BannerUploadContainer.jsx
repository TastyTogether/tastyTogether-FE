import * as S from './style/BannerUploadContainer.style';
import { useState } from 'react';

export default function BannerUploadContainer({ setBanners }) {
    const [uploadImageSrcList, setUploadImageSrcList] = useState([]);
    const [uploadImageList, setUploadImageList] = useState([]);

    const handlImageUpload = (event) => {
        const uploadImageFiles = event.target.files;

        if (uploadImageFiles.length > 8) {
            alert('이미지는 최대 8개까지 등록 가능합니다.');
            return;
        }

        const newUploadImageSrcList = [...uploadImageSrcList];
        const newUploadImageList = [...uploadImageList];

        for (let i = 0; i < uploadImageFiles.length; i++) {
            const file = uploadImageFiles[i];

            if (isNewUploadFile(file)) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    const uploadResult = fileReader.result;
                    newUploadImageSrcList.push(uploadResult);
                    newUploadImageList.push(file);
                    setUploadImageSrcList(newUploadImageSrcList);
                    setUploadImageList(newUploadImageList);

                    setBanners([...newUploadImageList]);
                };
            } else {
                alert(`${file.name}파일은 이미 업로드된 이미지입니다.`);
            }
        }
    };

    const isNewUploadFile = (uploadImageFile) => {
        return uploadImageList.every((el) => el.name !== uploadImageFile.name);
    };

    const cancleAllUpload = () => {
        setUploadImageList([]);
        setUploadImageSrcList([]);
        setBanners([]);
    };

    const deleteUploadImage = (idx) => {
        const newUploadImageSrcList = [...uploadImageSrcList];
        newUploadImageSrcList.splice(idx, 1);
        setUploadImageSrcList(newUploadImageSrcList);

        const newUploadImageList = [...uploadImageList];
        newUploadImageList.splice(idx, 1);
        setUploadImageList(newUploadImageList);
        setBanners(newUploadImageList);
    };

    return (
        <S.BannerUploadContainer>
            <S.BannerUploadLabel htmlFor="imageUpload">이미지 업로드</S.BannerUploadLabel>
            <S.BannerUploadInput
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handlImageUpload}
            />
            <S.BannerUploadLabel htmlFor="uploadCancle" isCancleBtn="true">
                취소하기
            </S.BannerUploadLabel>
            <S.CancleAllUploadButton id="uploadCancle" type="button" onClick={cancleAllUpload} />
            <S.BannerUploadNotification>
                이미지는 최소 1개에서 8개까지 첨부 가능합니다.
            </S.BannerUploadNotification>
            <S.BannerUploadImageBox>
                {uploadImageSrcList.map((el, idx) => {
                    return (
                        <S.UploadImagePreviewContainer key={idx}>
                            <S.UploadImagePreview key={idx} src={el} alt="uploadImagePreview" />
                            <S.uploadImageDeleteButton
                                type="button"
                                onClick={() => deleteUploadImage(idx)}
                            >
                                <S.DeleteButtonIcon src={'/imgs/x.png'} />
                            </S.uploadImageDeleteButton>
                        </S.UploadImagePreviewContainer>
                    );
                })}
            </S.BannerUploadImageBox>
        </S.BannerUploadContainer>
    );
}
