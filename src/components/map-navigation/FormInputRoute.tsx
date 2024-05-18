import {
  DataPostRouteProps,
  getRoute,
  postRoute,
  ReqPostRouteProps,
  RouteResponseStatus,
} from "@/api/route";
import { Button, Card } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useAppSelector, useAppStore } from "@/store/hooks";
import { setToken, initialRoute, resetRoute } from "@/store/slices/routeSlice";
import toast from "react-hot-toast";
import CardMessage from "../CardMessage";
import RouteInformation from "./RouteInformation";
import AutocompleteInputPlace from "./AutocompleteInputPlace";
import ButtonsApiTesting from "./ButtonsApiTesting";
import { useRouter } from "next/navigation";

export default function FormInputRoute() {
  const router = useRouter();
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
        switch (data.status) {
          case RouteResponseStatus.success:
            store.dispatch(initialRoute(data));
            router.push("#google-map");
            setLoading(false);
            break;
          case RouteResponseStatus.in_progress:
            result.status = "error";
            break;
          case RouteResponseStatus.failure:
            store.dispatch(initialRoute(data));
            setLoading(false);
            break;
          case RouteResponseStatus.error:
            store.dispatch(initialRoute(data));
            setLoading(false);
            break;
        }
        return data;
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
  const { mutate } = useMutation({
    mutationFn: (route: ReqPostRouteProps) => {
      return postRoute(route);
    },
    onError: (error) => {
      setLoading(false);
    },
    onSuccess: async ({ token }: DataPostRouteProps) => {
      setLoading(false);
      store.dispatch(setToken(token));
      if (routeState.token) {
        result.refetch();
      }
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
    store.dispatch(resetRoute());
  };

  return (
    <div className="p-10 lg:p-20">
      <Card className="p-10 mb-8">
        <form
          onSubmit={onSubmitFormRouteRequest}
          onReset={onResetFormRouteRequest}>
          <div className="grid grid-rows-1 gap-8">
            <h1 className="text-gray-500">
              Enter a pick-up location and a drop-off location
            </h1>
            <AutocompleteInputPlace
              name="origin"
              label="Pick-up Location"
              placeholder="Search a pick-up location"
            />
            <AutocompleteInputPlace
              name="destination"
              label="Drop-off Location"
              placeholder="Search a drop-off location"
            />
            {result.isFetching && (
              <CardMessage
                type="warning"
                message="Finding the best route for you. Please wait :)"
              />
            )}
            {routeState.error != "" && routeState.error != undefined && (
              <CardMessage type="error" message={routeState.error} />
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
            <ButtonsApiTesting />
          </div>
        </form>
      </Card>
      {routeState.total_distance > 0 && routeState.total_time > 0 && (
        <RouteInformation
          total_distance={routeState.total_distance}
          total_time={routeState.total_time}
        />
      )}
    </div>
  );
}
