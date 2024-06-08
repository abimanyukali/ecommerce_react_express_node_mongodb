import {
  Facebook,
  Instagram,
  MailOutline,
  Pinterest,
  Twitter,
} from '@mui/icons-material';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  pad: 20px;
  ${mobile({ display: 'none' })}
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 20px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  ${mobile({ padding: '20px', backgroundColor: '#f8f3f3' })}
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Logo = styled.h1``;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>ABI.</Logo>
        <Desc>
          There are variations of passages of Ipsum available ,but the majority
          have suffered alteration is some for by injected
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023 ">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title> Useful Links</Title>
        <List>
          <ListItem>Useful Links</ListItem>
          <ListItem>Home</ListItem>
          <ListItem>Cart </ListItem>
          <ListItem>Man Fashion </ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories </ListItem>
          <ListItem>Order Tracking </ListItem>
          <ListItem>Wishlist </ListItem>
          <ListItem>Wishlist </ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <FmdGoodOutlinedIcon style={{ marginRight: '10px' }} /> 622 North
          Street,koonanchery ,612301
        </ContactItem>
        <ContactItem>
          <CallOutlinedIcon style={{ marginRight: '10px' }} /> +1 234 7753
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '10px' }} /> contact@lama.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
