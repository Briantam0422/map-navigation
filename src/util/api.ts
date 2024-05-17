import { config } from "@/config/app";

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
        console.log(data)
        if (res.ok) {
            return data
        } else {
            return 'error'
        }
    } catch (error) {
        console.log(error)
        return error
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
            return data
        } else {
            return 'error'
        }
    } catch(error) {
        console.log(error)
        return error
    }
    
}