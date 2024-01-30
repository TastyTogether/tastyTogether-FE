import styled from 'styled-components';

export const Container = styled.section`
    position: absolute;
    top: 0;
    width: 100%;
    height: 500px;
    /* background-image: ${(props) =>
        props.photos == null ? 'url("/imgs/banner.jpg")' : `url(${props.photos})`}; */
    // 서버에서 가져온 이미지의 해상도가 좋지 않아 클라이언트 public 안에 있는 고정 이미지 사용
    background-image: url('/imgs/banner.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TextContainer = styled.div`
    width: 680px;
    margin-bottom: 20px;
`;

export const Title = styled.h3`
    font-size: 35px;
    color: white;
`;

export const Form = styled.form`
    display: flex;
    align-items: center;
`;

export const Search = styled.input`
    width: 600px;
    height: 60px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    outline: none;
    font-size: 20px;
    padding: 0 30px;
    border: 2px solid var(--color-accent);
    border-right: none;
`;

export const SubmitBtn = styled.button`
    width: 80px;
    height: 60px;
    font-size: 26px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 2px solid var(--color-accent);
    background-color: var(--color-accent);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
