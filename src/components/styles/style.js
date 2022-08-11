import { Link } from "react-router-dom";

const { default: styled } = require("styled-components");

export const NavLink = styled(Link)`
  list-style-type: none;
  font-size: 18px;
  color: #799283;
  text-decoration: none;
  text-align: left;
  padding: 8px;
`;

export const TRow = styled.tr`
  background-color: #ffffff;
  margin: 0;
  text-align: left;
  &:hover {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }
`;

export const TrHead = styled.tr`
  background-color: white;
  border-radius: 20px;
  padding: 60px;
`;

export const KpiNumber = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
export const KpiTitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #787878;
`;
export const UserName = styled.h4`
  font-weight: 500;
  font-size: 16px;
`;
export const UserEmail = styled.p`
  font-weight: 300;
  color: #b2b2b2;
  font-size: 12px;
`;
export const Footer = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

export const Id = styled.div`
  font-weight: 300;
  color: #799283;
  font-size: 10px;
`;
export const Date = styled.td`
  font-weight: 500;
  font-size: 16px;
`;
export const PriceRoom = styled.td`
  font-weight: 700;
  font-size: 16px;
`;
