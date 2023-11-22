// useToken.js
import { useSelector } from 'react-redux';

const useToken = () => {
    const token = useSelector((state) => state.auth.token);
    console.log(token)
    return token;
};

export default useToken;
