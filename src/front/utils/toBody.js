export default function (data) {
    if (data && typeof data === 'object') {
        return JSON.stringify(data);
    }
    return data;
}