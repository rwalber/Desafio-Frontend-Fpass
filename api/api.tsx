import md5 from 'md5';

export const baseURL = 'https://gateway.marvel.com/v1/public';

export const generateHash = () => {
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY_MARVEL;
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY_MARVEL;
    const ts = Date.now();
    const hash = md5(ts + String(privateKey) + String(publicKey));
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}
