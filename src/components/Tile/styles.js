import styled, { css } from 'styled-components';

export const SeaTile = styled.div`
  background-color: ${props => (props.selected ? 'blue' : 'transparent')};
  border: 1px solid black;
`;

export const BitOfShip = styled.div`
  background-color: yellow;
  width: 100%;
  height: 100%;
  border-top-left-radius: ${props => (props.position === 'start' ? '50%' : 0)};
  border-top-right-radius: ${props =>
    (props.position === 'start' && props.direction === 'vertical') ||
    (props.position === 'end' && props.direction === 'horizontal')
      ? '50%'
      : 0};
  border-bottom-left-radius: ${props =>
    (props.position === 'start' && props.direction === 'horizontal') ||
    (props.position === 'end' && props.direction === 'vertical')
      ? '50%'
      : 0};
  border-bottom-right-radius: ${props => (props.position === 'end' ? '50%' : 0)};
  ${props =>
    props.solo &&
    css`
      border-radius: 50%;
    `}
`;
