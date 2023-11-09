import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import * as S from './style/Board.style';
import { FiSearch } from 'react-icons/fi';
import axios from '../../utils/axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Board() {
    const [text, setText] = useState('');
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { countperpage = 10 } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts(currentPage);
    }, [countperpage, currentPage]);

    const fetchPosts = async (pageNo = 1, searchText = '') => {
        try {
            let response;

            if (searchText) {
                response = await axios.get(`/regionSearch?value=${searchText}`);
                setPosts(response.data || []);
                setCurrentPage(1);
                setTotalPages(1);
            } else {
                response = await axios.get(`/posts/?countperpage=${countperpage}&pageno=${pageNo}`);
                if (response.data) {
                    setPosts(response.data.data);
                    setCurrentPage(response.data.currentPage);
                    setTotalPages(response.data.totalPages);
                } else {
                    setPosts([]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPosts(1, text);
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <S.Container>
            <S.BannerBox>
                <img src="/imgs/logo2.png" alt="logo" />
                <Link to="/post/create">
                    <button>작성하기</button>
                </Link>
            </S.BannerBox>
            <S.MainWrapper>
                <S.FindText> &quot;혼밥 메이트를 찾고 있어요.&quot;</S.FindText>
                <S.SearchForm onSubmit={handleSubmit}>
                    <S.SubmitBtn>
                        <FiSearch />
                    </S.SubmitBtn>
                    <S.SearchInput
                        type="search"
                        name="search"
                        id="search"
                        placeholder="지역검색"
                        value={text}
                        onChange={handleChange}
                    />
                    <S.SearchButton type="submit">검색</S.SearchButton>
                </S.SearchForm>
                <S.StyledBoxWrapper>
                    {posts?.map((post) => (
                        <S.StyledBox key={post._id} onClick={() => handlePostClick(post._id)}>
                            <S.StyledBoxImageWrapper>
                                <S.StyledBoxImage src={post.image} alt="Post" />
                            </S.StyledBoxImageWrapper>
                            <S.PostInfo>
                                <S.PostInfoText>
                                    <FaMapMarkerAlt />
                                    {post.region}
                                </S.PostInfoText>
                                <S.PostInfoText>{post.title}</S.PostInfoText>
                                <S.PostInfoText>{post.meetDate}</S.PostInfoText>
                            </S.PostInfo>
                        </S.StyledBox>
                    ))}
                </S.StyledBoxWrapper>
                <S.Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <S.PageNumber key={index} selected={index + 1 === currentPage}>
                            <S.pageBtn onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </S.pageBtn>
                        </S.PageNumber>
                    ))}
                </S.Pagination>
            </S.MainWrapper>
        </S.Container>
    );
}
