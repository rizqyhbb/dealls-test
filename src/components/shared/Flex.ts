import styled from "@emotion/styled";
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
  border,
  color,
  flexbox,
  layout,
  shadow,
  space,
} from "styled-system";

interface IFlex
  extends ColorProps,
    SpaceProps,
    FlexboxProps,
    LayoutProps,
    BorderProps,
    ShadowProps {}
export const Flex = styled.div<IFlex>`
  display: flex;
  ${layout}
  ${flexbox}
  ${space}
  ${color}
  ${border}
  ${shadow}
`;
