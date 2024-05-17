import { Card } from "@nextui-org/react";

type RouteInformationProps = {
  total_distance: number;
  total_time: number;
};

export default function RouteInformation(props: RouteInformationProps) {
  return (
    <Card className="p-10">
      <div className="grid grid-rows-1 gap-2">
        <h1 className="text-gray-500 mb-4">Route Information</h1>
        <div className="flex justify-between align-middle">
          <div>Total Distance</div>
          <div>{props.total_distance}km</div>
        </div>
        <div className="flex justify-between align-middle">
          <div>Total Time</div>
          <div>{props.total_time}</div>
        </div>
      </div>
    </Card>
  );
}
