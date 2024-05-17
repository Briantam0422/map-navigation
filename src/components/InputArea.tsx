import {
  DataGetRouteProps,
  DataPostRouteProps,
  getRoute,
  postRoute,
  ReqPostRouteProps,
} from "@/api/route";
import { Button, Card, Input } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { ReqGetRouteProps } from "../api/route";

type InputAreaProps = {};

export default function InputArea(props: InputAreaProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const { error, mutate } = useMutation({
    mutationFn: (route: ReqPostRouteProps) => {
      console.log(route);
      return postRoute(route);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
    onSuccess: async ({ token }: DataPostRouteProps) => {
      console.log("Submit success");
      setToken(token);
      queryClient.refetchQueries({
        queryKey: ["route", token],
      });
    },
  });
  const onSubmitFormRouteRequest = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate({
      origin: formData.get("origin") ?? "",
      destination: formData.get("destination") ?? "",
    });
  };
  const result = useQuery({
    enabled: token != "",
    queryKey: ["route", token],
    queryFn: async () => {
      setLoading(true);
      const data = await getRoute({ token });
      console.log("data: ", data);
      if (data.status === "in progress") {
        console.log("in progress");
        queryClient.refetchQueries({
          queryKey: ["route", token],
        });
      } else {
        setLoading(false);
      }
      return data;
    },
    retry: false,
  });
  return (
    <div className="p-20">
      <Card className="p-10 mb-8">
        <form onSubmit={onSubmitFormRouteRequest}>
          <div className="grid grid-rows-1 gap-8">
            <h1 className="text-gray-500">
              Enter a starting location and a drop-off location
            </h1>
            <Input
              isClearable
              label="Starting Location"
              name="origin"
              isRequired
              defaultValue="Innocentre, Hong Kong"
            />
            <Input
              isClearable
              label="Drop-off Location"
              name="destination"
              isRequired
              defaultValue="Hong Kong International Airport Terminal 1"
            />
            {result.error?.message}
            {result.data?.error}
            {error?.message}
            <div className="flex gap-4">
              <Button isLoading={loading} type="submit" color="primary">
                Submit
              </Button>
              <Button isLoading={loading} color="default" variant="light">
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Card>
      <Card className="p-10">
        <div className="grid grid-rows-1 gap-2">
          <h1 className="text-gray-500 mb-4">Route Information</h1>
          <div className="flex justify-between align-middle">
            <div>Total Distance</div>
            <div>{result.data?.total_distance}km</div>
          </div>
          <div className="flex justify-between align-middle">
            <div>Total Time</div>
            <div>{result.data?.total_time}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
