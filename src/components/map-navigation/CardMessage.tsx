import { Card, CardBody } from "@nextui-org/react";
import result from "postcss/lib/result";

type CardErrorProps = {
  message: string;
  type: "error" | "success" | "warning" | "info";
};

export default function CardMessage({ type, message }: CardErrorProps) {
  let className = "";
  switch (type) {
    case "error":
      className += "bg-red-100";
      break;
    case "success":
      className += "bg-green-100";
      break;
    case "warning":
      className += "bg-orange-100";
      break;
    case "info":
      className += "bg-gray-100";
      break;
  }

  return (
    <Card>
      <CardBody className={className}>
        <p>{message}</p>
      </CardBody>
    </Card>
  );
}
