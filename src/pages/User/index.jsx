import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';

export default function User() {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  
  return (
    <Container className="pb-5">
      <Card className="border-0 mb-3">
        <div className="frame ratio ratio-1x1">
          <Card.Img varient="top" 
            src={require(`../../assets/avaters/${user.avater}.png`).default}
            alt={user.avater}/>
        </div>
        <Card.Title className="text-center">
          <h2 className="fs-3">{user.name}
            <span className="fs-6">{`（${user.username}）`}</span>
          </h2>
          <h3>{user.company}</h3>
        </Card.Title>
      </Card>
      <div>
        <h3>使用者資訊</h3>
        <p>職位：{user.post || "未填寫"}</p>
        <p>薪資：{user.salary || "未填寫"}</p>
        <p>簡介：{user.info || "未填寫"}</p>
      </div>
      <Button className="btn-danger w-100">登出</Button>
    </Container>
  )
}
