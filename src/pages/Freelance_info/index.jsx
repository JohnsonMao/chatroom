import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FloatingLabel, Container, Button } from 'react-bootstrap';

import HeaderNavbar from '../../components/HeaderNavbar';
import AvaterSelector from '../../components/Avater_selector';


export default function FreelanceInfo() {

  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <HeaderNavbar title="接案者資料設定"/>
      <Container>
        <AvaterSelector />
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="post" label="求職職位" className="mb-3">
            <Form.Control
              name="post"
              // onChange={setSignInForm}
              placeholder="請輸入求職職位"
            />
          </FloatingLabel>

          <FloatingLabel controlId="info" label="自我簡介" className="mb-3">
            <Form.Control
              as="textarea"
              name="info"
              // onChange={setSignInForm}
              placeholder="請輸入自我簡介"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Button type="submit" className="w-100">保 存</Button>
        </Form>
      </Container>
    </>
  )
}
