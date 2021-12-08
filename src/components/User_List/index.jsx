import React from "react";
import { useHistory } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import { Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

UserList.propTypes = {
  userList: PropTypes.array.isRequired,
};

export default function UserList(props) {
  const { userList } = props;
  const history = useHistory();

  return (
    <QueueAnim type="scale" component="ul" className="pt-2">
      {userList.map((user) => (
        <li key={user._id} className="mb-2 border-0">
          <Card
            bg="primary"
            onClick={() => history.push(`/chat/${user._id}`)}
          >
            <Card.Body as={Row} className="gx-2">
              <Col xs="4">
                <div className="ratio ratio-1x1">
                  <Card.Img
                    varient="top"
                    src={
                      require(`../../assets/avaters/${
                        user.avater || `dog-1`
                      }.png`).default
                    }
                    alt={user.avater}
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <Card.Title className="text-success">
                    {user.name}
                    <span className="fs-6 text-light">（ {user.username} ）</span>
                  </Card.Title>
                  <ul>
                    <li>生日：{user.birthday || "未填寫"}</li>
                    <li>性別：{user.gender || "未填寫"}</li>
                    <li>簡介：{user.info || "未填寫"}</li>
                  </ul>
                </div>
              </Col>
            </Card.Body>
          </Card>
        </li>
      ))}
    </QueueAnim>
  );
}
