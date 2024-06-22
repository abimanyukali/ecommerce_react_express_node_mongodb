import React, { useState } from 'react';
import styled from 'styled-components';
import { publicRequest } from '../requestMethods';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: teal;
  margin-bottom: 10px;
  border-radius: 15px;
`;
const Span = styled.span`
  color: #3f7a3fb2;
  font-size:16px;
`;
const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post('/auth/forgot', { email });
      console.log({ email });
    } catch (error) {}
  };
  return (
    <Container>
      <Form>
        <Input
          placeholder="enter email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Span>please Check your mail</Span>
        <Button onClick={handleClick}>submit</Button>
      </Form>
    </Container>
  );
};

export default ForgetPassword;
