import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './style/CreatePost.style';
import { FaImage, FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

export default function CreatePost() {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [date, setDate] = useState('');
    const [region, setRegion] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const { authRequiredAxios } = useAxios('multipart/form-data');

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setSelectedImage(imageURL);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', fileInputRef.current.files[0]);
        formData.append('region', region);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('meetDate', date);

        try {
            await authRequiredAxios.post('/posts', formData);
            alert('게시글이 성공적으로 생성되었습니다!');
            navigate('/post');
        } catch (error) {
            alert('게시글 생성에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <S.Container>
            <S.BoxContainer>
                <S.Box1>
                    <div>
                        <FaRegCalendarAlt />
                        <label>
                            날짜
                            <input type="date" onChange={(e) => setDate(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <FaMapMarkerAlt />
                        <label>
                            지역
                            <input type="text" onChange={(e) => setRegion(e.target.value)} />
                        </label>
                    </div>
                </S.Box1>

                <S.Box2>
                    <input
                        type="file"
                        accept=".jpg, .png"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Selected"
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <span onClick={handleIconClick}>
                            <S.ImageUploadIcon>
                                <FaImage />
                            </S.ImageUploadIcon>
                            <span style={{ fontSize: '24px' }}>이미지 파일을 선택해주세요.</span>
                        </span>
                    )}
                </S.Box2>
                <S.Box3>
                    <textarea
                        placeholder="ex)8월 18일 오레노라멘 가실분 구합니다."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </S.Box3>

                <S.Box4>
                    <textarea
                        placeholder="어떤 동행을 찾고있나요? 구체적으로 작성해주세요."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </S.Box4>
                <S.Btn>
                    <Link to="/post">
                        <S.ButtonCancel>취소</S.ButtonCancel>
                    </Link>
                    <S.ButtonSubmit onClick={handleSubmit}>작성하기</S.ButtonSubmit>
                </S.Btn>
            </S.BoxContainer>
        </S.Container>
    );
}
