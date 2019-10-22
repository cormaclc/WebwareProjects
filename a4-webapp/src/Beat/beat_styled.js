import styled from 'styled-components'

const BeatWrapper = styled.div`
    animation: fadeIn ${props => props.index} linear;
    transition: visibility ${props => props.index} linear;
`;

export {BeatWrapper}