import styled from "styled-components";
import LogoImage from "../assets/images/logo.avif";

export default function Header() {
  return (
    <Container>
      <Logo src={LogoImage} alt="Logo" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
`;
