import React, { useEffect, useState } from 'react';
import * as S from './style/PostDetail.style';
import {
    FaRegCalendarAlt,
    FaMapMarkerAlt,
    FaRegPlusSquare,
    FaRegWindowClose,
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

export default function PostDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const { authRequiredAxios } = useAxios('application/json');
    const [commentsToShow, setCommentsToShow] = useState(3);

    const fetchPostDetail = async () => {
        try {
            const response = await authRequiredAxios.get(`/posts/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    useEffect(() => {
        fetchPostDetail();
    }, [id]);

    const fetchPostDelete = async () => {
        try {
            await authRequiredAxios.delete(`/posts/${id}`);
            alert('게시글이 성공적으로 삭제되었습니다.');
            navigate('/post');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('게시글을 삭제하는데 실패했습니다.');
        }
    };
    const fetchCreateComment = async () => {
        try {
            const response = await authRequiredAxios.post(`/${id}/comments`, {
                content: commentContent,
            });
            const newComment = {
                id: response.data._id,
                ...response.data,
            };
            setPost((prevPost) => ({
                ...prevPost,
                comments: [...prevPost.comments, newComment],
            }));
            setCommentContent('');
        } catch (error) {
            console.error('Error creating comment:', error);
            alert('댓글을 생성하는데 실패했습니다.');
        }
    };

    const fetchCommentDelete = async (commentId) => {
        try {
            await authRequiredAxios.delete(`/comments/${commentId}`);
            alert('댓글이 성공적으로 삭제되었습니다.');
            setPost((prevPost) => {
                return {
                    ...prevPost,
                    comments: prevPost.comments.filter((comment) => comment.id !== commentId),
                };
            });
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('댓글을 삭제하는데 실패했습니다.');
        }
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
        if (isConfirmed) {
            fetchPostDelete();
        }
    };

    const handleCommentDelete = (commentId) => {
        const isConfirmed = window.confirm('정말로 댓글을 삭제하시겠습니까?');
        if (isConfirmed) {
            fetchCommentDelete(commentId);
        }
    };
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, curr) => {
            return acc && acc[curr] ? acc[curr] : null;
        }, obj);
    };

    const moreComment = () => {
        console.log('hi');
        setCommentsToShow(commentsToShow + 10000);
    };

    return (
        <S.Container>
            <S.DetailPost>
                <S.PostHeader>
                    <S.TitleBox>
                        <h3 className="title">
                            {getNestedValue(post, 'board.title') || 'Loading...'}😋
                        </h3>
                    </S.TitleBox>
                    <S.SetBoard>
                        <S.UserBox>
                            <span className="nickName">
                                {getNestedValue(post, 'board.userId.nickname') || 'Loading...'}
                            </span>
                            <span className="createdAt">
                                {getNestedValue(post, 'board.createdAt') || 'Loading...'}
                            </span>
                        </S.UserBox>
                        <S.ButtonBox>
                            <S.LinkButton to="/post" className="boardList">
                                목록조회
                            </S.LinkButton>
                            <button className="boardDelete" onClick={handleDelete}>
                                삭제하기
                            </button>
                        </S.ButtonBox>
                    </S.SetBoard>
                </S.PostHeader>
                <S.IconBox>
                    <S.ImageBox>
                        <S.FoodImage
                            src={getNestedValue(post, 'board.image') || 'Loading...'}
                            alt="음식사진"
                        />
                    </S.ImageBox>
                    <S.ThreeIcon>
                        <S.RegionBox>
                            <FaMapMarkerAlt />
                            <p>
                                지역:
                                <span className="region">
                                    {getNestedValue(post, 'board.region') || 'Loading...'}
                                </span>
                            </p>
                        </S.RegionBox>
                        <S.DateBox>
                            <FaRegCalendarAlt />
                            <p>
                                약속일자:
                                <span className="meetDate">
                                    {getNestedValue(post, 'board.meetDate') || 'Loading...'}
                                </span>
                            </p>
                        </S.DateBox>
                        <S.ContentBox>
                            <p className="content">
                                {getNestedValue(post, 'board.content') || 'Loading...'}
                            </p>
                        </S.ContentBox>
                    </S.ThreeIcon>
                </S.IconBox>
                <S.CommentBox>
                    {post &&
                        post.comments &&
                        post.comments.slice(0, commentsToShow).map((comment) => {
                            return (
                                <S.CommentList key={comment.id}>
                                    <S.CommentProfile>
                                        <S.ProfileBox>
                                            <S.ProfileImg
                                                src={
                                                    getNestedValue(
                                                        comment,
                                                        'userId.profileImage',
                                                    ) || ''
                                                }
                                                alt="프로필이미지"
                                            />
                                        </S.ProfileBox>
                                        <div>
                                            <S.NickName>
                                                {getNestedValue(comment, 'userId.nickname') ||
                                                    'Unknown'}
                                            </S.NickName>
                                            <S.CommentTime>{comment.createdAt}</S.CommentTime>
                                        </div>
                                    </S.CommentProfile>
                                    <S.CommentContent>
                                        <span>{comment.content}</span>
                                        <S.DeleteBtn
                                            onClick={() => {
                                                handleCommentDelete(comment.id);
                                            }}
                                        >
                                            <FaRegWindowClose />
                                            삭제
                                        </S.DeleteBtn>
                                    </S.CommentContent>
                                </S.CommentList>
                            );
                        })}
                    <S.MoreComment onClick={moreComment}>더보기</S.MoreComment>
                </S.CommentBox>

                <S.AddComment>
                    <S.CommentAdd>
                        <S.CommentInput
                            type="text"
                            placeholder="댓글을 입력하세요..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <S.CommentRegister onClick={fetchCreateComment}>
                            <FaRegPlusSquare />
                            등록하기
                        </S.CommentRegister>
                    </S.CommentAdd>
                </S.AddComment>
            </S.DetailPost>
        </S.Container>
    );
}
