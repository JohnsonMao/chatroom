import React from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, ListGroup } from "react-bootstrap";

/* 取得每個聊天的最後一條訊息 */
function getLastMsgs(chatMsgs) {
  const lastMsgObjs = {}; // 每個最後一個聊天訊息的物件 {chat_id: lastMsg}
  chatMsgs.forEach((msg) => {
    const chatId = msg.chat_id;
    const lastMsg = lastMsgObjs[chatId];
    if (!lastMsg) {
      // 如果找不到代表當前這個訊息為 lastMsg
      lastMsgObjs[chatId] = msg;
    } else {
      if (msg.create_time > lastMsg.create_time) {
        // 判斷是不是最後一個訊息
        lastMsgObjs[chatId] = msg;
      }
    }
  });

  const lastMsgs = Object.values(lastMsgObjs); // 取出 value 值，轉為陣列
  /* 進行陣列排序 */
  lastMsgs.sort((m1, m2) => m2.create_time - m1.create_time);
  return lastMsgs;
}

export default function Message() {
  const user = useSelector((state) => state.user);
  const { users, chatMsgs } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const history = useHistory();

  const lastMsgs = getLastMsgs(chatMsgs);
  console.log(lastMsgs);

  return (
    <Container>
      <ListGroup as="ul" variant="flush">
        {lastMsgs.map((msg) => {
          const targetUserId = msg.to === user._id ? msg.from : msg.to;
          const { avater, name, username } = users[targetUserId];
          return (
            <ListGroup.Item as="li" key={msg._id}>
              <Card className="border-0"
                onClick={() => history.push(`/chat/${targetUserId}`)}>
                <Card.Body className="d-flex align-items-center">
                  <div className="frame-chat ratio ratio-1x1">
                    <Card.Img
                      varient="top"
                      src={
                        require(`../../assets/avaters/${avater || `dog-1`}.png`)
                          .default
                      }
                      alt="avater"
                    />
                  </div>
                  <div className="ms-2">
                    <Card.Title className="mb-1">
                      {`${name}（${username}）`}
                    </Card.Title>
                    <Card.Text className="text-dark m-0">
                      {msg.content}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}
