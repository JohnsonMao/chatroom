import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FloatingLabel, Container, Button } from 'react-bootstrap';

import HeaderNavbar from '../../components/HeaderNavbar';
import AvaterSelector from '../../components/Avater_selector';

export default function BossInfo() {

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <HeaderNavbar title="老闆資料設定"/>
      <Container>
        <AvaterSelector />
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="post" label="招聘職位" className="mb-3">
            <Form.Control
              name="post"
              // onChange={setSignInForm}
              placeholder="請輸入招聘職位"
            />
          </FloatingLabel>
          
          <FloatingLabel controlId="company" label="公司名稱" className="mb-3">
            <Form.Control
              name="company"
              // onChange={setSignInForm}
              placeholder="請輸入公司名稱"
            />
          </FloatingLabel>
          
          <FloatingLabel controlId="salary" label="職位薪資" className="mb-3">
            <Form.Control
              name="salary"
              // onChange={setSignInForm}
              placeholder="請輸入職位薪資"
            />
          </FloatingLabel>

          <FloatingLabel controlId="info" label="職位簡介" className="mb-3">
            <Form.Control
              as="textarea"
              name="info"
              // onChange={setSignInForm}
              placeholder="請輸入職位簡介"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Button type="submit" className="w-100">保 存</Button>
        </Form>
      </Container>
    </>
  )
}
