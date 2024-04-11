export const GETRequest = {
    method:'GET',
    mode: "cors",
    headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
    }
}

export const GETTokenRequest = (authToken) => {
    return {
        method:'GET',
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    }
}

export const POSTRequest = (body) => {
    return {
                method: "POST",  
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(body)
        }
}