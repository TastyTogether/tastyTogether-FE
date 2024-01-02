import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from 'styled-components';

export default function ArrowUpBtn({ show, setShow }) {
    const handleClick = () => {
        window.scroll({ top: 0, behavior: 'smooth' });
        setShow('hidden');
    };
    return (
        <Container>
            <Btn onClick={handleClick} show={show}>
                <FaArrowUp />
            </Btn>
        </Container>
    );
}
const Container = styled.div`
    width: 800px;
    position: fixed;
    display: flex;
    justify-content: end;
    bottom: 11%;
    left: 50%;
    transform: translateX(-35%);
    z-index: 1;
`;
const Btn = styled.button`
    display: ${(props) => (props.show === 'show' ? 'flex' : 'none')};
    font-size: 1.5rem;
    color: white;
    background-color: var(--color-accent);
    border: none;
    outline: none;
    border-radius: 50%;
    padding: 1rem;
`;
