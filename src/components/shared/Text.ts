import styled from "@emotion/styled";
import { ColorProps, TypographyProps, color, typography } from "styled-system";

interface IText extends TypographyProps, ColorProps {}
export const Text = styled.p<IText>`
  margin: 4px;
  ${typography}
  ${color}
`;
