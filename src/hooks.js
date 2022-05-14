import { useState, useEffect } from 'react';
import axios from 'axios';

function useFlip(flipState = true) {
    const [flipped, setFlipped] = useState(flipState)

    const flip = () => {
        setFlipped(isFlipped => !isFlipped);
    }

    return[flipped, flip]
}

function useAxios(key, rootUrl) {
    const [responses, setResponses] = useLocalStorage(key)

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        const response = await axios.get(`${rootUrl}${restOfUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
    };

    return [responses, addResponseData]; 
}

function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
}

export default useLocalStorage

export { useFlip, useAxios, useLocalStorage }
