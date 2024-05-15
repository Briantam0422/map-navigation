import { Button, Card, Input } from "@nextui-org/react";

type InputAreaProps = {};

export default function InputArea(props: InputAreaProps) {
  return (
    <div className="grid grid-rows-1 gap-5 p-20">
      <Card className="p-10">
        <div className="grid grid-rows-1 gap-8">
          <h1 className="text-gray-500">
            Enter a starting location and a drop-off location
          </h1>
          <Input isClearable label="Starting Location" />
          <Input isClearable label="Drop-off Location" />
          <div className="flex gap-4">
            <Button color="primary">Submit</Button>
            <Button color="default" variant="light">
              Reset
            </Button>
          </div>
        </div>
      </Card>
      <Card className="p-10">
        <div className="grid grid-rows-1 gap-2">
          <h1 className="text-gray-500 mb-4">Route Information</h1>
          <div className="flex justify-between align-middle">
            <div>Total Distance</div>
            <div>19991km</div>
          </div>
          <div className="flex justify-between align-middle">
            <div>Total Time</div>
            <div>1800</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
