import { styled } from "styled-components";
export const Button = styled.button`
  display: block;
  width: 100%;
  height: 52px;
  padding: 0px 36px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: none;
  background-color: #623ed1;
  color: #fbfbfb;
  text-align: center;
  /* Btns/Btn1 */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  &:hover {
    background-color: #360b90;
  }

  &:active {
    background-color: #d4d4f5;
    color: #506277;
  }
`;
