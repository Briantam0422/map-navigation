import { getRequest, GetRequestProps, postRequest } from "@/util/api";

export type ReqGetRouteProps = {
    token: string
}
export type DataGetRouteProps = {
    status: string,
    path: Array<Array<number>>,
    total_distance: number,
    total_time: number
}
export type ReqPostRouteProps = {
    origin: string,
    destination: string
}
export type DataPostRouteProps = {
    token: string
}
export async function getRoute({token}: ReqGetRouteProps){
    const url = "route/:" + token
    const data: DataGetRouteProps = await getRequest({url})
    return data
}
export async function postRoute(body: ReqPostRouteProps){
    const url = "/route"
    const data:DataPostRouteProps = await postRequest({url, body})
    return data
}