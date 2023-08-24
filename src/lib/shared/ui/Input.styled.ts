import styled from "styled-components";

export const Input = styled.input`
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  border-radius: 8px;
  border: 1px solid #e6ecf1;
  background: #e6ecf1;
  padding: 14px 20px;
  color: #07040f;
  display: block;
  width: 100%;

  &:placeholder {
    color: #8797aa;
  }

  &:focus {
    border: 1px solid #623ed1;
    background: #e6ecf1;
  }
`;
