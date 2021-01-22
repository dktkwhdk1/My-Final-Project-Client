import styled, { css } from 'styled-components';

export const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Circle = styled.div`
  display: flex;
  width: 11rem;
  height: 11rem;
  background: black;
  border-radius: 12px;
  border: 2px solid #dee2e6;
  cursor: pointer;
  margin: 0.5rem;
  align-items: center;
  justify-content: center;
  
  :hover {
    background-color: yellow;
    transition: background-color .5s;
    div {
      color: black;
    }
  }
  div {
    width: 30px
    margin: 1rem;
    color: white;
    font-size: 20px;
    text-align: center;
  }
  ${props =>
    (props.isSign || props.isFestival) &&
    css`
      flex-direction: column;
    `}
  .input {
    flex-direction: column;
    input {
      border-radius: 4px;
      border: 1px solid #dee2e6;
      width: 120px;
      height: 25px;
      font-size: 15px;
      margin-top: 3px;
    }
  }
`;
