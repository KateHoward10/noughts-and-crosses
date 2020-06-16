import styled, { css } from 'styled-components';

export const SeaTile = styled.div`
  background-color: ${props => (props.selected ? 'blue' : 'transparent')};
  border: 1px solid black;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 600px) {
    padding: 10px;
  }
`;

export const BitOfShip = styled.div`
  background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Verdana, sans-serif;
  font-size: 16px;
  border: 1px solid grey;
  ${props =>
    (props.visible || props.completed) &&
    css`
      border-top-left-radius: ${props.position === 'start' ? '50%' : 0};
      border-top-right-radius: ${(props.position === 'start' && props.direction === 'vertical') ||
      (props.position === 'end' && props.direction === 'horizontal')
        ? '50%'
        : 0};
      border-bottom-left-radius: ${(props.position === 'start' && props.direction === 'horizontal') ||
      (props.position === 'end' && props.direction === 'vertical')
        ? '50%'
        : 0};
      border-bottom-right-radius: ${props.position === 'end' ? '50%' : 0};
    `}
  ${props =>
    (props.visible || props.completed) &&
    props.solo &&
    css`
      border-radius: 50%;
    `}
  @media screen and (min-width: 600px) {
    font-size: 20px;
  }
`;
