import { getRequest, postRequest } from "@/utils/api";
import { DataGetRouteProps, DataPostRouteProps } from '../route';

export async function postMockRouteError() {
    const url = "/mock/route/500";
    const data: DataPostRouteProps = await postRequest({url});
    return data;
}

export async function postMockRouteSuccess() {
    const url = "/mock/route/success";
    const data: DataPostRouteProps = await postRequest({url});
    return data;
}

export async function getMockRouteError() {
    const url = "/mock/route/500";
    const data: DataGetRouteProps = await getRequest({url});
    return data;
}

export async function getMockRouteInprogress(){
    const url = "/mock/route/inprogress";
    const data: DataGetRouteProps = await getRequest({url});
    return data;
}

export async function getMockRouteFailure(){
    const url = "/mock/route/failure";
    const data: DataGetRouteProps = await getRequest({url});
    return data;
}

export async function getMockRouteSuccess(){
    const url = "/mock/route/success";
    const data: DataGetRouteProps = await getRequest({url});
    return data;
}