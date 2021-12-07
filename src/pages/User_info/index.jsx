import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';

import HeaderNavbar from '../../components/HeaderNavbar';
import AvaterSelector from '../../components/Avater_selector';
import useForm from "../../utils/useFormHook";
import { updateUser } from '../../redux/actions';

export default function UserInfo() {
  
  const user = useSelector(state => state.user);

  const [userForm, setUserForm] = useForm({
    avater: user?.avater,
    birthday: user?.birthday || '',
    gender: user?.gender || '',
    name: user?.name || '',
    info: user?.info || ''
  });
  
  const dispatch = useDispatch();
  
  const setAvater = (e) => {
    setUserForm({
      target: {
        name: "avater",
        value: e.avater
      }
    })
  }
  
  const handleSubmit = () => {
    dispatch( updateUser(userForm));
  }
  
  return (
    <>
      <HeaderNavbar title="個人資料設定"/>
      <Container>
        <Form>
          <AvaterSelector setAvater={setAvater} avater={userForm.avater} />

          <FloatingLabel controlId="name" label="暱稱" className="mb-3">
            <Form.Control
              name="name"
              onChange={setUserForm}
              value={userForm.name}
              placeholder="請輸入暱稱"
            />
          </FloatingLabel>

          <FloatingLabel controlId="birthday" label="生日" className="mb-3">
            <Form.Control
              name="birthday"
              type="date"
              onChange={setUserForm}
              value={userForm.birthday}
              placeholder="請輸入生日"
            />
          </FloatingLabel>

          <Form.Group as={Row} className="align-items-center g-0 mb-3">
            <Form.Label as="legend" column>
              性別：
            </Form.Label>
            <Col>
              <Form.Check
                type="radio"
                name="gender"
                onChange={setUserForm}
                value="男性"
                checked={userForm.gender === "男性"}
                label="男性"
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                name="gender"
                onChange={setUserForm}
                value="女性"
                checked={userForm.gender === "女性"}
                label="女性"
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                name="gender"
                onChange={setUserForm}
                value="其他"
                checked={userForm.gender === "其他"}
                label="其他"
              />
            </Col>
          </Form.Group>

          <FloatingLabel controlId="info" label="自我介紹" className="mb-3">
            <Form.Control
              as="textarea"
              name="info"
              onChange={setUserForm}
              placeholder="請輸入自我介紹，讓大家更認識你！"
              value={userForm.info}
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Link to="user" className="btn btn-primary w-100" onClick={handleSubmit}>保 存</Link>
        </Form>
      </Container>
    </>
  )
}
