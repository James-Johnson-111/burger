import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-builder-c7517-default-rtdb.firebaseio.com/'
});
export default instance;