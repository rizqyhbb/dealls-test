import styled from "@emotion/styled";
import {
  BorderProps,
  ColorProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
  border,
  color,
  layout,
  shadow,
  space,
} from "styled-system";

export interface IBox
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    BorderProps,
    ShadowProps {}
export const Box = styled.div<IBox>`
  ${layout}
  ${space}
  ${color}
  ${border}
  ${shadow}
`;
