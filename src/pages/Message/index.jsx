import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import QueueAnim from "rc-queue-anim";
import { Container, Card, Row, Col } from "react-bootstrap";

/* 取得每個聊天的最後一條訊息 */
function getLastMsgs(chatMsgs, userid) {
  const lastMsgObjs = {}; // 每個最後一個聊天訊息的物件 {chat_id: lastMsg}
  chatMsgs.forEach((msg) => {
    // 每個 msg 新增未讀屬性
    if (msg.to === userid && !msg.read) {
      msg.unReadCount = 1;
    } else {
      msg.unReadCount = 0;
    }

    // 得到 msg 的 id
    const chatId = msg.chat_id;
    const lastMsg = lastMsgObjs[chatId];
    if (!lastMsg) {
      // 如果找不到代表當前這個訊息為 lastMsg
      lastMsgObjs[chatId] = msg;
    } else {
      // 累計 unReadCount = 原有的 + 新的 msg
      const unReadCount = lastMsg.unReadCount + msg.unReadCount;

      // 判斷是不是最後一個訊息
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
      // 保存在最新的 lastMsg
      lastMsgObjs[chatId].unReadCount = unReadCount;
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
  const history = useHistory();

  const lastMsgs = getLastMsgs(chatMsgs, user._id);

  return (
    <Container>
      <QueueAnim type="left" component="ul" className="pt-2">
        {lastMsgs.map((msg) => {
          const targetUserId = msg.to === user._id ? msg.from : msg.to;
          const { avater, name, username } = users[targetUserId];
          return (
            <li key={msg._id} className="mb-2">
              <Card
                bg="primary"
                className="border-0"
                onClick={() => history.push(`/chat/${targetUserId}`)}
              >
                <Card.Body as={Row} className="d-flex align-items-center">
                  <Col>
                    <div className="ratio ratio-1x1">
                      <Card.Img
                        varient="top"
                        src={
                          require(`../../assets/avaters/${
                            avater || `dog-1`
                          }.png`).default
                        }
                        alt="avater"
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="ms-2">
                      <Card.Title className="text-success mb-1">
                        {name}
                        <span className="fs-6">（ {username} ）</span>
                      </Card.Title>
                      <Card.Text className="m-0">{msg.content}</Card.Text>
                    </div>
                  </Col>
                  {msg.unReadCount ? (
                    <span className="bg-danger position-absolute end-0 translate-middle-x lh-1 rounded-pill px-2 py-1">
                      {msg.unReadCount}
                    </span>
                  ) : null}
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </QueueAnim>
    </Container>
  );
}
