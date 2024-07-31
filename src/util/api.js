export async function fetchdata(url, json) {
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const res = await response.json();
    if (!response.ok) {
        return res
    }
    
    return res.result
}
