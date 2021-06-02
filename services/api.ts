import axios from 'axios';
import { parseCookies } from 'nookies';

const { moco_user_token: Authorization } = parseCookies();

const api = axios.create({
    baseURL: process.env.API_HOST,
    headers: { Authorization }
});

export {
    api
}