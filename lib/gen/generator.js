"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTSCode = void 0;
const utils_1 = require("../utils");
const abi_1 = require("../types/abi");
const abiArgument_1 = require("../types/abiArgument");
const defaultConstructor = 'constructor(web3Instance: Web3, abi: any[], address: string){\n' +
    '  this.web3 = web3Instance;\n' +
    '  this.abi = abi;\n' +
    '  this.contract = new this.web3.eth.Contract(this.abi, address)\n' +
    '}';
function prepareTSInputs(inputArgs) {
    return inputArgs.map((arg, i) => `${arg.name !== '' ? arg.name : 'id_' + (i + 1)}: ${prepareArgType(arg)}`).join(', ');
}
function prepareArgType(arg) {
    if (arg.type === abiArgument_1.ABIArgumentType.Tuple && arg.components) {
        return '{\n' +
            arg.components.map(field => (0, utils_1.addIndent)(`${field.name}: ${prepareArgType(field)}`, 2)).join(',\n')
            + '\n}';
    }
    else if (arg.type === abiArgument_1.ABIArgumentType.Tuple + '[]' && arg.components) {
        return '{\n' +
            arg.components.map(field => (0, utils_1.addIndent)(`${field.name}: ${prepareArgType(field)}`, 2)).join(',\n')
            + '\n}[]';
    }
    else if (arg.type.includes('[]')) {
        const itemAbiType = arg.type.replace('[]', '');
        return `(${abiArgument_1.ABITypesJS[itemAbiType]})[]`;
    }
    else {
        const key = arg.type;
        return abiArgument_1.ABITypesJS[key];
    }
}
function prepareCallOutput(outputArgs) {
    if (outputArgs.length === 1) {
        return prepareArgType(outputArgs[0]);
    }
    else if (outputArgs.length === 0) {
        return 'void';
    }
    else {
        return '{\n' +
            (0, utils_1.addIndent)(outputArgs.map(arg => `${arg.name}: ${prepareArgType(arg)}`)
                .join(',\n'), 2) +
            '\n}';
    }
}
function generateContractFunction(abi) {
    const optionsType = abi.stateMutability === abi_1.ABIStateMutability.View
        ? 'CallOptions'
        : 'SendOptions';
    const outputType = abi.stateMutability === abi_1.ABIStateMutability.View
        ? `Promise<${prepareCallOutput(abi.outputs)}>`
        : `PromiEvent<Contract>`;
    const callFunction = abi.stateMutability === abi_1.ABIStateMutability.View
        ? `call(options)`
        : `send(options)`;
    if (abi.inputs.length === 0) {
        return `${abi.name}(options?: ${optionsType}): ${outputType} {\n` +
            `  return this.contract.methods.${abi.name}().${callFunction};\n` +
            `}\n`;
    }
    return `${abi.name}(${prepareTSInputs(abi.inputs)}, options?: ${optionsType}): ${outputType} {\n` +
        `  return this.contract.methods.${abi.name}(\n` +
        `    ${abi.inputs.map((arg, i) => arg.name !== '' ? arg.name : 'id_' + (i + 1)).join(',\n    ')}\n` +
        `  ).${callFunction};\n` +
        `}\n`;
}
function generateTSCode(contractName, abi) {
    let res = '';
    res += 'import Web3 from "web3"\n' +
        'import { Contract, CallOptions, SendOptions } from "web3-eth-contract"\n' +
        'import { PromiEvent } from "web3-core";\n' +
        'import BigNumber from "bignumber.js";\n\n';
    res += `class ${contractName}Contract {\n` +
        '  web3: Web3;\n' +
        '  abi: any[];\n' +
        '  contract: Contract;\n\n' +
        (0, utils_1.addIndent)(defaultConstructor, 2) + '\n\n';
    res += abi.filter(f => f.type === abi_1.ABIType.Function).map(f => (0, utils_1.addIndent)(generateContractFunction(f), 2)).join('\n');
    res += '\n}';
    return res;
}
exports.generateTSCode = generateTSCode;
//# sourceMappingURL=generator.js.map