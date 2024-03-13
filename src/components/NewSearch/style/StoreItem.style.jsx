import styled from 'styled-components';
import { FaBookmark } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';

export const Item = styled.li`
    display: flex;
    width: 100%;
    padding: 1rem 2rem;
    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
`;

export const ItemLeft = styled.div`
    width: 30%;
    height: 100%;
`;

export const ItemImg = styled.img`
    width: 190px;
    height: 150px;
    border-radius: 1rem;
`;

export const ItemCenter = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const Name = styled.span`
    color: black;
    font-weight: bold;
    font-size: 1.8rem;
    transition: all 150ms ease-out;
    &:hover {
        text-decoration: underline;
    }
`;

export const Category = styled.span`
    color: gray;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem 0;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 0.5rem;
`;

export const Tag = styled.span`
    margin-right: 0.4rem;
    color: black;
    font-weight: bold;
`;

export const Icons = styled.div`
    display: flex;
    align-items: center;
`;

export const Icon = styled.span`
    &:nth-of-type(2) {
        margin: 0 0.7rem;
    }
    display: flex;
    align-items: center;
    font-size: 1.1rem;
`;

export const IconCount = styled.span`
    margin-left: 0.2rem;
    font-size: 1.1rem;
    line-height: 1.1rem;
`;

export const StarIcon = styled(FaStar)`
    color: tomato;
    font-size: 1.2rem;
`;

export const BookMarkIcon = styled(FaBookmark)`
    color: var(--color-accent);
`;

export const ItemRight = styled.div`
    width: 20%;
    height: 100%;
`;

export const ItemAddress = styled.span`
    float: right;
    color: gray;
    font-weight: bold;
    font-size: 1.6rem;
`;
