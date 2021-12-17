"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.addIndent = exports.getIndent = void 0;
const getIndent = (len) => {
    return ' '.repeat(len);
};
exports.getIndent = getIndent;
const addIndent = (str, indent) => {
    return (0, exports.getIndent)(indent) + str.replace(/\n/g, '\n' + (0, exports.getIndent)(indent));
};
exports.addIndent = addIndent;
const getFileName = (filePath) => {
    const fullName = filePath.split('/').pop();
    return (fullName === null || fullName === void 0 ? void 0 : fullName.split('.').shift()) || '';
};
exports.getFileName = getFileName;
//# sourceMappingURL=index.js.map