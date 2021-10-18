import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

import { sendMsg } from '../../redux/actions';
import HeaderNavbar from '../../components/HeaderNavbar';

export default function Chat() {
  
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [ content, setContent ] = useState('');

  const handleSend = () => {
    const from = user._id;
    const to = userid;
    if (content) {
      dispatch( sendMsg({from, to, content}));
    }
    setContent('');
  }

  return (
    <>
      <HeaderNavbar title="Name（username）"/>
      <Container className="mt-1">
      <Card className="flex-row border-0 mb-1">
          <div className="frame-chat ratio ratio-1x1">
            <Card.Img src={require(`../../assets/avaters/cat-1.png`).default}
            alt="cat-1"/>
          </div>
          <p className="m-2 mt-3">123</p>
        </Card>
        <Card className="flex-row border-0 mb-1">
          <div className="frame-chat ratio ratio-1x1">
            <Card.Img src={require(`../../assets/avaters/cat-1.png`).default}
            alt="cat-1"/>
          </div>
          <p className="m-2 mt-3">123</p>
        </Card>
        <Card className="flex-row-reverse border-0 mb-1">
          <div className="frame-chat ratio ratio-1x1">
            <Card.Img src={require(`../../assets/avaters/cat-1.png`).default}
            alt="cat-1"/>
          </div>
          <p className="m-2 mt-3">123</p>
        </Card>
        <InputGroup className="fixed-bottom">
          <FormControl
            placeholder="開始聊天"
            onChange={e => setContent(e.target.value.trim())}
            value={content}
            aria-label="Start chat"
            aria-describedby="submit"
          />
          <Button variant="primary" id="submit" onClick={handleSend}>
            傳送
          </Button>
        </InputGroup>
      </Container>
    </>
  )
}
