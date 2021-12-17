export const getIndent = (len) => {
    return ' '.repeat(len);
};
export const addIndent = (str, indent) => {
    return getIndent(indent) + str.replace(/\n/g, '\n' + getIndent(indent));
};
export const getFileName = (filePath) => {
    const fullName = filePath.split('/').pop();
    return (fullName === null || fullName === void 0 ? void 0 : fullName.split('.').shift()) || '';
};
//# sourceMappingURL=index.js.map