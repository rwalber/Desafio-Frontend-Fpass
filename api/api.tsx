import md5 from 'md5';

export const baseURL = 'http://gateway.marvel.com/v1/public';

export const generateHash = () => {
    const publicKey = '6829debddb01a1a3c9409cc4e728e066';
    const privateKey = 'fea09e4184d4047bad0bd0984bd40e568f3db08d';
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}
