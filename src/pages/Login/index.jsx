import React from "react";
import { Link } from "react-router-dom";
import { Form, FloatingLabel, Container, Button } from "react-bootstrap";

import HeaderMenu from "../../components/HeaderMenu";
import Logo from "../../components/Logo";
import useForm from "../../utils/useFormHook";

export default function Login() {
  const [signInForm, setSignInForm] = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <HeaderMenu />
      <Logo />
      <Container>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="username" label="帳號" className="mb-3">
            <Form.Control
              name="username"
              onChange={setSignInForm}
              placeholder="帳號"
            />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="密碼" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              onChange={setSignInForm}
              placeholder="密碼"
            />
          </FloatingLabel>

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register">沒有帳號 ?</Link>
            <Button type="submit">登入</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}