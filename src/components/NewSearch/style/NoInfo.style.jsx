import styled from 'styled-components';
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: gray;
`;

export const Icon = styled(MdErrorOutline)`
    font-size: 4rem;
    margin: 1rem 0;
`;

export const TopP = styled.p`
    font-size: 1.2rem;
`;

export const BottomP = styled.p`
    font-size: 1rem;
    text-align: center;
`;

export const LinkBtn = styled(Link)`
    margin-top: 1rem;
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    font-weight: bold;
    border-radius: 2rem;
    padding: 1rem;
    transition: all 150ms ease-out;
    &:hover {
        background-color: var(--color-accent);
        color: white;
        border-color: var(--color-accent);
    }
`;
