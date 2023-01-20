import React from "react";
import styled, { keyframes } from "styled-components";

export const Square = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 45%;
  margin-bottom: 2.5%;
  align-items: center;
`;

export const SquareSecond = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 40%;
  margin-bottom: 5%;
  align-items: center;
`;

const flip = keyframes`
 0% {transform: rotateX(0) rotateY(0)}
 25% {transform: rotateX(0) rotateY(180deg)}
 50% {transform: rotateX(180deg) rotateY(180deg)}
 75% {transform: rotateX(180deg) rotateY(0)}
 100% {transform: rotateX(0) rotateY(0)}
 `;

export const SquareDiv = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: antiquewhite;
  transform-origin: right bottom;
  animation: ${flip} 2s linear infinite;

  &:nth-child(1) {
    animation-delay: 0.5s;
    opacity: 0;
  }
`;

const SquareLoader = ({ square }) => {
  return (
    <>
      {!square && (
        <Square>
          <SquareDiv />
          <SquareDiv />
          <SquareDiv />
          <SquareDiv />
        </Square>
      )}

      {square && (
        <SquareSecond>
          <SquareDiv />
          <SquareDiv />
          <SquareDiv />
          <SquareDiv />
        </SquareSecond>
      )}
    </>
  );
};

export default SquareLoader;
