import styled from "@emotion/styled";
import {
  BorderProps,
  ColorProps,
  FlexProps,
  GridProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
  border,
  color,
  flexbox,
  grid,
  layout,
  shadow,
  space,
} from "styled-system";

interface IGrid
  extends GridProps,
    LayoutProps,
    FlexProps,
    SpaceProps,
    ColorProps,
    BorderProps,
    ShadowProps {}
export const Grid = styled.div<IGrid>`
  display: grid;
  ${grid}
  ${layout}
  ${flexbox}
  ${space}
  ${color}
  ${border}
  ${shadow}
`;
