import { useState, useEffect } from "react";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data')
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(e => {
                    if(e.name === 'AbortError') {
                        console.log('fetch');
                    } else {
                        setError(e.message);
                        setIsPending(false);
                    }
                })
        }, 500);

        return() => {
            abortCont.abort();
        }

    }, [url]);

    return({data, isPending, error});
}

export default useFetch