import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import avaters from '../../assets/avaters';

const avatersList = avaters.map((item, index) => (
  <Col key={`avater-${index}`}>
    <Card className="h-100 justify-content-end border-0 bg-light p-2">
      <Card.Img variant="top" 
        src={require(`../../assets/avaters/${item.src}`).default} 
        alt={item.name} />
      <Card.Title className="text-center m-0">{item.name}</Card.Title>
    </Card>
  </Col>
))

export default function AvaterSelector() {
  return (
    <>
      <p className="p-2 mb-0">請選擇虛擬形象</p>
      <Row xs={4} className="g-2 mb-2">
        { avatersList }
      </Row>
    </>
  )
}
