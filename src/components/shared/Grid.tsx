import styled from "@emotion/styled";
import { GridProps, grid } from "styled-system";

interface IGrid extends GridProps {}
export const Grid = styled.div<IGrid>`
  display: grid;
  ${grid}
`;
