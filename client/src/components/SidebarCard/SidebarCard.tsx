import "./SidebarCard.css";
import { ReactElement } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import { Icon } from "../Icon/Icon";

export function SidebarCard({
  image,
  collapseButton,
  onCardClick,
  cardName,
  cardDelete,
}: ISidebarCardProps) {
  return (
    <Card className="sidebar-card" onClick={onCardClick}>
      <CardBody className="d-flex flex-row align-items-center">
        <Col xs={1}>{collapseButton}</Col>
        <Col xs={2}>
          <Icon className="sidebar-card-icon" name={image} />
        </Col>
        <Col xs={8}>
          <span className="sidebar-card-name">{cardName}</span>
        </Col>
        <Col xs={1}>
          <Button className="sidebar-card-delete" onClick={cardDelete}>
            X
          </Button>
        </Col>
      </CardBody>
    </Card>
  );
}

interface ISidebarCardProps {
  image: string;
  collapseButton?: ReactElement<React.JSXElementConstructor<HTMLButtonElement>>;
  onCardClick: () => void;
  cardName: string;
  cardDelete: () => void;
}
