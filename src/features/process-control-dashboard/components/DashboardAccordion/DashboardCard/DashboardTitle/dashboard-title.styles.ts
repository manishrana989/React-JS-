import styled from "styled-components";

export const DashboardTitleContainer = styled.div<{ showCursor: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  cursor: ${(props) => (props.showCursor ? "pointer" : "default")};

  //max 3 lines, ellipsis if more
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TooltipContainer = styled.div`
  position: relative;
  left: -10px;
`;

export const Tooltip = styled.div`
  min-height: 32px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #efefef;
  border-radius: 4px;
  position: absolute;
  top: -30px;
  padding: 8px 7px;
  white-space: initial;
  z-index: 100;

  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;
