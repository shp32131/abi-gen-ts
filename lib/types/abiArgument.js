export var ABIArgumentType;
(function (ABIArgumentType) {
    ABIArgumentType["Uint"] = "uint";
    ABIArgumentType["Uint8"] = "uint8";
    ABIArgumentType["Uint16"] = "uint16";
    ABIArgumentType["Uint32"] = "uint32";
    ABIArgumentType["Uint64"] = "uint64";
    ABIArgumentType["Uint128"] = "uint128";
    ABIArgumentType["Uint256"] = "uint256";
    ABIArgumentType["Int"] = "int";
    ABIArgumentType["Int8"] = "int8";
    ABIArgumentType["Int16"] = "int16";
    ABIArgumentType["Int32"] = "int32";
    ABIArgumentType["Int64"] = "int64";
    ABIArgumentType["Int128"] = "int128";
    ABIArgumentType["Int256"] = "int256";
    ABIArgumentType["String"] = "string";
    ABIArgumentType["Address"] = "address";
    ABIArgumentType["Bool"] = "bool";
    ABIArgumentType["Bytes"] = "bytes";
    ABIArgumentType["Bytes32"] = "bytes32";
    ABIArgumentType["Bytes64"] = "bytes64";
    ABIArgumentType["Tuple"] = "tuple";
})(ABIArgumentType || (ABIArgumentType = {}));
export const ABITypesJS = {
    [ABIArgumentType.Uint]: 'string | BigNumber',
    [ABIArgumentType.Uint8]: 'number | string | BigNumber',
    [ABIArgumentType.Uint16]: 'string | BigNumber',
    [ABIArgumentType.Uint32]: 'string | BigNumber',
    [ABIArgumentType.Uint64]: 'string | BigNumber',
    [ABIArgumentType.Uint128]: 'string | BigNumber',
    [ABIArgumentType.Uint256]: 'string | BigNumber',
    [ABIArgumentType.Int]: 'string | BigNumber',
    [ABIArgumentType.Int8]: 'number | string | BigNumber',
    [ABIArgumentType.Int16]: 'number | string | BigNumber',
    [ABIArgumentType.Int32]: 'number | string | BigNumber',
    [ABIArgumentType.Int64]: 'string | BigNumber',
    [ABIArgumentType.Int128]: 'string | BigNumber',
    [ABIArgumentType.Int256]: 'string | BigNumber',
    [ABIArgumentType.String]: 'string',
    [ABIArgumentType.Address]: 'string',
    [ABIArgumentType.Bool]: 'boolean',
    [ABIArgumentType.Bytes]: 'string | BigNumber',
    [ABIArgumentType.Bytes32]: 'string | BigNumber',
    [ABIArgumentType.Bytes64]: 'string | BigNumber',
};
//# sourceMappingURL=abiArgument.js.map