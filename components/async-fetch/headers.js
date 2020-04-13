import { encryp } from './../../utils/signature.js';

const initHeaders = ({ request }) => {
    const token = localStorage.getItem('rejiejay-diary-system-token')
    const username = 'rejiejay'

    const signature = encryp(request, username, token);

    return {
        'Content-Type': 'application/json; charset=utf-8',
        'x-rejiejay-authorization': signature
    }
}

export default initHeaders