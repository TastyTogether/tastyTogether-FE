import styled from 'styled-components';

export const Order = styled.div`
    display: flex;
    width: 100%;
    justify-self: flex-start;
    padding: 2rem 2rem 1rem;
`;

export const OrderLogo = styled.div`
    display: flex;
    align-items: center;
`;

export const LogoImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
`;

export const Filters = styled.ul`
    display: flex;
    align-self: flex-start;
`;

export const Filter = styled.li`
    font-weight: bold;
    background-color: ${(props) =>
        props.selected === 'selected' ? 'var(--color-accent)' : 'transparent'};
    border: 1px solid ${(props) => (props.selected === 'selected' ? 'var(--color-accent)' : 'grey')};
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    color: ${(props) => (props.selected === 'selected' ? 'white' : 'gray')};
    cursor: pointer;
    transition: all 150ms ease-out;

    &:hover {
        background-color: var(--color-accent);
        color: white;
        border-color: transparent;
    }
    &:nth-of-type(2) {
        margin: 0 1rem;
    }
`;
