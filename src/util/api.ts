interface RequestProps {
    url : string;
}

interface GetRequestProps extends RequestProps {
    params: string | string[][] | Record<string, string> | URLSearchParams | undefined
}
interface PostRequestProps extends RequestProps {
    body: BodyInit | null | undefined;
}

const RequestMethod = {
    GET: "GET",
    POST: "POST"
}

function getHeader(){
    return {
        'content-type': 'application/json'
    }
}

export async function getRequest({url, params}: GetRequestProps){
    url = url + new URLSearchParams(params)
    const headers = getHeader();
    const res = await fetch(url, {
        method: RequestMethod.GET,
        headers
    })
    const {data, errors} = await res.json()
    if (res.ok) {
        return data
    } else {
        return Promise.reject(errors)
    }
}

export async function postRequest({url, body}: PostRequestProps){
    const headers = getHeader();
    const res = await fetch(url, {
        method: RequestMethod.POST,
        headers,
        body
    })
    const {data, errors} = await res.json()
    if (res.ok) {
        return data
    } else {
        return Promise.reject(errors)
    }
}