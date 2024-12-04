
export const bufferToBase64 = (bufferData) => {
    const byteArray = Array.isArray(bufferData) ? bufferData : Array.from(bufferData);
    return btoa(byteArray.reduce((data, byte) => data + String.fromCharCode(byte), ''));
};

