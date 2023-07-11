import styled from "@emotion/styled";
import {
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  color,
  flexbox,
  layout,
  space,
} from "styled-system";

interface IFlex extends ColorProps, SpaceProps, FlexboxProps, LayoutProps {}
export const Flex = styled.div<IFlex>`
  display: flex;
  ${layout}
  ${flexbox}
  ${space}
  ${color}
`;
