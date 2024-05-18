import { getRequest, GetRequestProps, postRequest } from "@/util/api";
export const RouteResponseStatus = {
    success : "success",
    in_progress: "in progress",
    failure: "failure",
    error: "error",
}
export type ReqGetRouteProps = {
    token: string
}
export type DataGetRouteProps = {
    status: string,
    path: Array<Array<number>>,
    total_distance: number,
    total_time: number,
    error?: string
}
export type ReqPostRouteProps = {
    origin: string | FormDataEntryValue,
    destination: string | FormDataEntryValue
}
export type DataPostRouteProps = {
    token: string
}
export async function getRoute({token}: ReqGetRouteProps){
    const url = `/route/${token}`
    const data: DataGetRouteProps = await getRequest({url})
    return data
}
export async function postRoute(body: ReqPostRouteProps){
    const url = `/route`
    const data:DataPostRouteProps = await postRequest({url, body})
    return data
}