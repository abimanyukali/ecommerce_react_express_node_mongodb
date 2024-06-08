import { Send } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
const Container = styled.div`
  height: 30vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: '30vh' })}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: '40px' })}
`;
const Desc = styled.text`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ TextAlign: 'center', fontSize: '12px', fontWeight: 200 })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '70%' })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;
function Newsletter() {
  return (
    <Container>
      <Title>Newsletter </Title>
      <Desc>Get timely updates from your favorite products. </Desc>
      <InputContainer>
        <Input placeholder="Your email " />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
