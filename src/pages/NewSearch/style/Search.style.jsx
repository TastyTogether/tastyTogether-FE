import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin-top: ${(props) => (props.content === undefined ? '0' : '100px')};
`;

export const SearchContainer = styled.div`
    margin: 2rem 0;
    width: 800px;
    border-radius: 1rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

export const ResultComment = styled.p`
    color: var(--color-accent);
    font-size: 1.2rem;
    font-weight: 600;
    justify-self: flex-start;
    width: 100%;
    padding: 1rem 2rem 0rem;
`;

export const Loading = styled.div`
    margin-top: 100px;
    min-height: 100vh;
`;
