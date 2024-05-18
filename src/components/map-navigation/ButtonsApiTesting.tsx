import {
  getMockRouteError,
  getMockRouteFailure,
  getMockRouteInprogress,
  getMockRouteSuccess,
  postMockRouteError,
  postMockRouteSuccess,
} from "@/api/mock/mockRoute";
import { DataPostRouteProps, RouteResponseStatus } from "@/api/route";
import { useAppStore } from "@/store/hooks";
import { initialRoute } from "@/store/slices/routeSlice";
import { Divider, Button, Link } from "@nextui-org/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ButtonsApiTesting() {
  const router = useRouter();
  const store = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [displayMockApiButtons, setDisplayMockApiButtons] =
    useState<boolean>(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const [submitType, setSubmitType] = useState<"success" | "error">("success");
  const [getType, setGetType] = useState<
    "success" | "in_progress" | "failure" | "error"
  >("success");
  const resultMock = useQuery({
    enabled: isSubmitSuccess,
    queryKey: ["routeMock", "mock"],
    queryFn: async () => {
      setLoading(true);
      let data = null;
      switch (getType) {
        case RouteResponseStatus.success:
          data = await getMockRouteSuccess();
          store.dispatch(initialRoute(data));
          setLoading(false);
          router.push("#google-map");
          break;
        case RouteResponseStatus.in_progress:
          data = await getMockRouteInprogress();
          resultMock.status = "error";
          resultMock.refetch();
          break;
        case RouteResponseStatus.failure:
          data = await getMockRouteFailure();
          setLoading(false);
          break;
        case RouteResponseStatus.error:
          data = await getMockRouteError();
          setLoading(false);
          break;
      }
    },
    retry: (failCount) => {
      if (failCount + 1 > 1) {
        setLoading(true);
        setGetType("success");
        return true;
      }
      return true;
    },
  });
  const { mutate } = useMutation({
    mutationFn: () => {
      switch (submitType) {
        case "success":
          return postMockRouteSuccess();
        case "error":
          return postMockRouteError();
      }
    },
    onError: (error) => {
      setLoading(false);
      setIsSubmitSuccess(false);
    },
    onSuccess: async ({ token }: DataPostRouteProps) => {
      setIsSubmitSuccess(true);
      setLoading(false);
      resultMock.refetch();
    },
  });

  const onClickTesting = (
    type: "success" | "in_progress" | "failure" | "error"
  ) => {
    setLoading(true);
    setIsSubmitSuccess(false);
    setGetType(type);
    mutate();
  };

  const onClickShowMockApiButtons = () => {
    setDisplayMockApiButtons(!displayMockApiButtons);
  };

  return (
    <>
      <Divider />
      <Link className="cursor-pointer" onClick={onClickShowMockApiButtons}>
        Try Mock APIs
      </Link>
      {displayMockApiButtons && (
        <div className="flex flex-wrap gap-4">
          <Button
            isLoading={loading}
            type="button"
            variant="flat"
            color="success"
            onClick={() => onClickTesting("success")}>
            Get Success
          </Button>
          <Button
            isLoading={loading}
            type="button"
            variant="flat"
            color="warning"
            onClick={() => onClickTesting("in_progress")}>
            Get In Progress
          </Button>
          <Button
            isLoading={loading}
            type="button"
            variant="flat"
            color="danger"
            onClick={() => onClickTesting("failure")}>
            Get Failure
          </Button>
          <Button
            isLoading={loading}
            type="button"
            variant="flat"
            color="danger"
            onClick={() => onClickTesting("error")}>
            Get Error
          </Button>
        </div>
      )}
    </>
  );
}
