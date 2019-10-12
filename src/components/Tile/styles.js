import styled from 'styled-components';

export const SeaTile = styled.div`
  background-color: ${props =>
    props.selected === 'water' ? 'blue' : props.selected === 'ship' ? 'yellow' : 'transparent'};
  border: 1px solid black;
`;
