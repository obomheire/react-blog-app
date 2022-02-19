import { useState, useEffect } from "react";

//Crearting a custom Hooks
const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
const aborCont = new AbortController() //NB: this is not needed if setTimeout is not used. setTimeout is only used here to demo async operation it could be removed

      setTimeout(() => {
      const getdata = async () =>{
        try{
            const res = await fetch(url, {signal: aborCont.signal})
            if (!res.ok) throw Error('Could not fetch Data!')
            const data = await res.json()
            setData(data)
            setIsPending(false)
            // setError(null)
        }catch(error){
          if(error.name === 'AbortError') console.log('Fetch Aborted')
          else{
            setIsPending(false)
            setError(error.message)
          }

        }
      }
      getdata()}
      , 1000)
     

        return () => aborCont.abort()
    }, [url])

  return {data, isPending, error}
};

export default useFetch;
