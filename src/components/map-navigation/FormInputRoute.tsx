import {
  DataPostRouteProps,
  getRoute,
  postRoute,
  ReqPostRouteProps,
} from "@/api/route";
import { Button, Card, CardBody, Input, Snippet } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useAppSelector, useAppStore } from "@/store/hooks";
import { setToken, initialRoute } from "@/store/slices/routeSlice";
import toast from "react-hot-toast";
import CardMessage from "./CardMessage";
import RouteInformation from "./RouteInformation";

export default function FormInputRoute() {
  const store = useAppStore();
  const routeState = useAppSelector((state) => state.route);
  const [loading, setLoading] = useState<boolean>(false);
  const result = useQuery({
    enabled: routeState.token != "" && routeState.token != null,
    queryKey: ["route", routeState.token],
    queryFn: async () => {
      setLoading(true);
      const data = await getRoute({ token: routeState.token });
      if (data) {
        setLoading(true);
        if (data.status === "in progress") {
          result.status = "error";
        } else {
          setLoading(false);
          return data;
        }
      } else {
        setLoading(false);
      }
    },
    retry: (failCount) => {
      setLoading(true);
      if (failCount > 2) {
        toast.error("Too many attempts, please try later");
        setLoading(false);
        return false;
      }
      return true;
    },
  });
  const { error, mutate } = useMutation({
    mutationFn: (route: ReqPostRouteProps) => {
      return postRoute(route);
    },
    onError: (error) => {
      setLoading(false);
    },
    onSuccess: async ({ token }: DataPostRouteProps) => {
      store.dispatch(setToken(token));
      if (routeState.token) {
        result.refetch();
      }
      setLoading(false);
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
  const onResetFormRouteRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
  };

  return (
    <div className="p-10 lg:p-20">
      <Card className="p-10 mb-8">
        <form
          onSubmit={onSubmitFormRouteRequest}
          onReset={onResetFormRouteRequest}>
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
            {result.isFetching ? (
              <CardMessage
                type="info"
                message="Finding the best path for you"
              />
            ) : (
              ""
            )}
            {result.isRefetching ? (
              <CardMessage
                type="warning"
                message="Please wait! We are trying the best to find the best path for you."
              />
            ) : (
              ""
            )}
            {result.data?.error && !result.isFetching ? (
              <CardMessage type="error" message={result.data.error} />
            ) : (
              ""
            )}
            <div className="flex gap-4">
              <Button isLoading={loading} type="submit" color="primary">
                Submit
              </Button>
              <Button
                isLoading={loading}
                type="reset"
                color="default"
                variant="light">
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Card>
      {result.data?.total_distance && result.data.total_time ? (
        <RouteInformation
          total_distance={result.data.total_distance}
          total_time={result.data.total_time}
        />
      ) : (
        ""
      )}
    </div>
  );
}
