import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Modal, ListGroup, Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';

import { resetUser } from '../../redux/actions';

export default function User() {
  
  const [ show, setShow ] = useState(false);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const toggleShow = () => setShow(!show);
  const signOut = () => {
    Cookies.remove('userid');
    dispatch( resetUser());
  }
  
  return (
    <Container className="pb-5">
      <Card className="border-0 my-3">
        <div className="frame ratio ratio-1x1">
          <Card.Img varient="top" 
            src={require(`../../assets/avaters/${user.avater}.png`).default}
            alt={user.avater}/>
        </div>
        <Card.Body className="text-center">
          <h2 className="fs-3">{user.name}
            <span className="fs-6">{`（${user.username}）`}</span>
          </h2>
          <h3>{user.company}</h3>
        </Card.Body>
      </Card>
      <div className="mb-3">
        <h3>用戶資訊</h3>
        <ListGroup as="ul" variant="flush">
          <ListGroup.Item as="li">生日：{user.birthday || "未填寫"}</ListGroup.Item>
          <ListGroup.Item as="li">性別：{user.gender || "未填寫"}</ListGroup.Item>
          <ListGroup.Item as="li">簡介：{user.info || "未填寫"}</ListGroup.Item>
        </ListGroup>
      </div>
      <Row className="g-2">
        <Col>
          <Link to="userinfo" className="btn btn-dark w-100">修改</Link>
        </Col>
        <Col>
          <Button variant="danger" className="w-100" onClick={toggleShow}>登出</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="justify-content-center border-0">
          <Modal.Title>確定要登出嗎？</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="row justify-content-center">
          <Button variant="outline-primary" className="col-5" onClick={toggleShow}>
            取消
          </Button>
          <Button variant="primary" className="col-5" onClick={signOut}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
