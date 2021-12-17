"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIndent = exports.getIndent = void 0;
const getIndent = (len) => {
    return ' '.repeat(len);
};
exports.getIndent = getIndent;
const addIndent = (str, indent) => {
    return (0, exports.getIndent)(indent) + str.replace(/\n/g, '\n' + (0, exports.getIndent)(indent));
};
exports.addIndent = addIndent;
//# sourceMappingURL=index.js.map