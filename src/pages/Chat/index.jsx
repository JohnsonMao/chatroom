import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Button,
  InputGroup,
  FormControl,
  ListGroup
} from "react-bootstrap";

import { sendMsg } from "../../redux/actions";
import HeaderNavbar from "../../components/HeaderNavbar";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const { users, chatMsgs } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [content, setContent] = useState("");

  const meId = user._id; // 我的 id
  const targetId = userid; // 對方 id
  const chatId = [meId, targetId].sort().join("_"); // 組合 id
  if (!users[meId]) return null; // 當資料還沒來時，先回傳 null

  const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);

  const handleSend = (e) => {
    if (!e.keyCode || e.keyCode === 13) {
      const from = user._id;
      const to = userid;
      if (content) {
        dispatch(sendMsg({ from, to, content }));
      }
      setContent("");
    }
  };

  const { target, me } = {
    target: {
      style: "flex-row border-0 mb-1",
      avater: require(`../../assets/avaters/${users[targetId].avater}.png`).default
    },
    me: {
      style: "flex-row-reverse border-0 mb-1",
      avater: require(`../../assets/avaters/${user.avater}.png`).default
    },
  };

  return (
    <>
      <HeaderNavbar title="Name（username）" />
      <Container className="mt-1">
        <ListGroup as="ul" variant="flush">
          {msgs.map((msg) => (
            <ListGroup.Item as="li" key={msg._id} className="border-0">
              <Card className={meId === msg.to ? target.style : me.style}>
                <div className="frame-chat ratio ratio-1x1">
                  <Card.Img
                    src={meId === msg.to ? target.avater : me.avater}
                    alt="avater"
                  />
                </div>
                <p className="m-2 mt-3">{msg.content}</p>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <InputGroup className="fixed-bottom">
          <FormControl
            placeholder="開始聊天"
            onChange={(e) => setContent(e.target.value.trim())}
            onKeyUp={handleSend}
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
  );
}
