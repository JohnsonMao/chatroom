import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

UserList.propTypes = {
  userList: PropTypes.array.isRequired
}

export default function UserList(props) {

  const { userList } = props;

  return (
    <ListGroup as="ul" variant="flush">
      {
      userList.map(user => (
        <ListGroup.Item as="li" key={user._id} className="mb-2 border-0">
          <Card>
            <Card.Body className="d-flex align-items-center">
              <div className="frame ratio ratio-1x1">
                <Card.Img varient="top" 
                  src={require(`../../assets/avaters/${user.avater || `dog-1`}.png`).default}
                  alt={user.avater}/>
              </div>
              <Card.Title>{ user.name }</Card.Title>
            </Card.Body>
            <ListGroup as="ul" variant="flush">
              <ListGroup.Item as="li">公司：{user.company || "未填寫"}</ListGroup.Item>
              <ListGroup.Item as="li">職位：{user.post || "未填寫"}</ListGroup.Item>
              <ListGroup.Item as="li">薪資：{user.salary || "未填寫"}</ListGroup.Item>
              <ListGroup.Item as="li">簡介：{user.info || "未填寫"}</ListGroup.Item>
            </ListGroup>
          </Card>
        </ListGroup.Item>
      ))
      }
    </ListGroup>
  )
}
