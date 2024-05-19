import { config } from "@/config/app";
import toast from "react-hot-toast";

interface RequestProps {
    url : string;
}

export interface GetRequestProps extends RequestProps {
    params?: string | string[][] | Record<string, string> | URLSearchParams | undefined
}
export interface PostRequestProps extends RequestProps {
    body?: object;
}

const apiUrl = config.api_url

const RequestMethod = {
    GET: "GET",
    POST: "POST"
}

function getUrl(url: string){
    return apiUrl + url
}

function getHeader(){
    return {
        'Content-Type': 'application/json'
    }
}

export async function getRequest({url, params}: GetRequestProps){
    url = getUrl(url) + new URLSearchParams(params)
    try {
        const res = await fetch(url, {
            method: RequestMethod.GET
        })
        const data = await res.json()
        if (res.ok) {
            if (data.error) toast.error(data.error)
        }
        return data
    } catch (e) {
        toast.error('Server Error, please try again')
        return null
    }
}

export async function postRequest({url, body}: PostRequestProps){
    url = getUrl(url)
    const headers = getHeader();
    try {
        const res = await fetch(url, {
            method: RequestMethod.POST,
            headers,
            body: JSON.stringify(body)
        })
        const data = await res.json()
        if (res.ok) {
            if (data.error) toast.error(data.error)
        }
        return data
    } catch(e) {
        toast.error('Server Error, please try again')
        return null
    }
    
}