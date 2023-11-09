import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    margin-top: 6%;
`;

export const DetailPost = styled.div`
    border-radius: 15px;
    width: 1000px;
    height: 1100px;
    background-color: #fff;
    border: 2px solid #ff9c5f;
    margin: auto;
`;
export const PostHeader = styled.div``;
export const SetBoard = styled.div`
    background-color: #ff9c5f;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #ff9c5f;
    padding: 0px 40px 20px 40px;
    font-size: 20px;
`;
export const TitleBox = styled.div`
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #ff9c5f;
    display: flex;
    justify-content: flex-start;
    padding: 60px 20px 30px 40px;
    align-content: center;
    > h3 {
        font-size: 33px;
    }
`;
export const ButtonBox = styled.div`
    > button {
        border: none;
        background-color: transparent;
        padding-right: 20px;
        font-size: 22px;
        font-weight: bold;
        color: white;
    }
`;
export const LinkButton = styled(Link)`
    border: none;
    background-color: transparent;
    padding-right: 20px;
    font-size: 22px;
    font-weight: bold;
    color: white;
`;
export const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 40px;
`;
export const IconBox = styled.div`
    display: flex;
    width: auto;
    height: 400px;
    border-bottom: 2px solid #ff9c5f;
`;
export const ThreeIcon = styled.div`
    display: flex;
    flex-direction: column;

    width: 500px;
    > div {
        display: flex;
    }
    p {
        padding-left: 10px;
        font-size: 22px;
        font-style: Bold;
        padding: 5px;
        > span {
            padding: 10px;
        }
    }
`;
export const RegionBox = styled.div`
    display: flex;
    align-items: center;
    width: 350px;
    height: 80px;
`;
export const DateBox = styled.div`
    display: flex;
    align-items: center;
    width: 350px;
    height: 80px;
`;
export const ContentBox = styled.div`
    display: flex;
    width: 350px;
    height: 300px;
`;
export const FoodImage = styled.img`
    border-radius: 15px;
`;
export const UserBox = styled.div`
    > span {
        padding-right: 10px;
    }
`;

export const AddComment = styled.div`
    width: auto;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ProfileImg = styled.img`
    width: 47px;
    height: 47px;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

// 댓글 box
export const CommentBox = styled.div`
    width: auto;
    height: 380px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

// 댓글 컴포넌트
export const CommentList = styled.div`
    width: 998px;
    height: auto;
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #ff9c5f;
`;

// 댓글 프로필 부분 (프로필 이미지 + 닉네임 + 작성시간)
export const CommentProfile = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 20px;
`;

// 댓글 프로필 이미지 감싸는 컴포넌트
export const ProfileBox = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 70%;
    overflow: hidden;
    margin-right: 20px;
`;

// 댓글 작성 시간
export const CommentTime = styled.div`
    font-size: 15px;
`;

export const CommentContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: auto;
    padding: 5px;
    margin-left: 50px;
    margin-right: 50px;
`;

export const NickName = styled.div`
    font-size: 18px;
`;
export const CommentRegister = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    margin-right: 10px;
    color: #f36d1a;
`;

export const CommentAdd = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 850px;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #ff9c5f;
`;
export const DeleteBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
export const CommentInput = styled.input`
    width: 750px;
    font-size: 15px;
    border: none;
    outline: none;
`;
