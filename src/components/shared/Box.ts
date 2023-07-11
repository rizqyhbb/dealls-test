import styled from "@emotion/styled";
import {
  ColorProps,
  LayoutProps,
  SpaceProps,
  color,
  layout,
  space,
} from "styled-system";

interface IBox extends ColorProps, SpaceProps, LayoutProps {}
export const Box = styled.div<IBox>`
  ${layout}
  ${space}
  ${color}
`;
