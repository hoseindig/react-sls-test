import { Card } from "react-bootstrap";
import styles from "./card.module.scss";
const MyCard = ({ children, header, title, color }) => {
  return (
    <Card
      border="primary"
      style={{ width: "18rem" }}
      bg={color.toLowerCase()}
      text={color.toLowerCase() === "light" ? "dark" : "white"}
      className={styles["card-style"]}
    >
      <Card.Header>{header}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text component={"p"}>{children}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
