export async function fetchdata(url, json) {
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const rpjson = await response.json();
    
    return rpjson.result
}
