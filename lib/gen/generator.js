import { addIndent } from "../utils";
import { ABIStateMutability, ABIType } from "../types/abi";
import { ABIArgumentType, ABITypesJS } from "../types/abiArgument";
const defaultConstructor = 'constructor(web3Instance: Web3, abi: any[], address: string){\n' +
    '  this.web3 = web3Instance;\n' +
    '  this.abi = abi;\n' +
    '  this.contract = new this.web3.eth.Contract(this.abi, address)\n' +
    '}';
function prepareTSInputs(inputArgs) {
    return inputArgs.map((arg, i) => `${arg.name !== '' ? arg.name : 'id_' + (i + 1)}: ${prepareArgType(arg)}`).join(', ');
}
function prepareArgType(arg) {
    if (arg.type === ABIArgumentType.Tuple && arg.components) {
        return '{\n' +
            arg.components.map(field => addIndent(`${field.name}: ${prepareArgType(field)}`, 2)).join(',\n')
            + '\n}';
    }
    else if (arg.type === ABIArgumentType.Tuple + '[]' && arg.components) {
        return '{\n' +
            arg.components.map(field => addIndent(`${field.name}: ${prepareArgType(field)}`, 2)).join(',\n')
            + '\n}[]';
    }
    else if (arg.type.includes('[]')) {
        const itemAbiType = arg.type.replace('[]', '');
        return `(${ABITypesJS[itemAbiType]})[]`;
    }
    else {
        const key = arg.type;
        return ABITypesJS[key];
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
            addIndent(outputArgs.map(arg => `${arg.name}: ${prepareArgType(arg)}`)
                .join(',\n'), 2) +
            '\n}';
    }
}
function generateContractFunction(abi) {
    const optionsType = abi.stateMutability === ABIStateMutability.View
        ? 'CallOptions'
        : 'SendOptions';
    const outputType = abi.stateMutability === ABIStateMutability.View
        ? `Promise<${prepareCallOutput(abi.outputs)}>`
        : `PromiEvent<Contract>`;
    const callFunction = abi.stateMutability === ABIStateMutability.View
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
export function generateTSCode(contractName, abi) {
    let res = '';
    res += 'import Web3 from "web3"\n' +
        'import { Contract, CallOptions, SendOptions } from "web3-eth-contract"\n' +
        'import { PromiEvent } from "web3-core";\n' +
        'import BigNumber from "bignumber.js";\n\n';
    res += `class ${contractName}Contract {\n` +
        '  web3: Web3;\n' +
        '  abi: any[];\n' +
        '  contract: Contract;\n\n' +
        addIndent(defaultConstructor, 2) + '\n\n';
    res += abi.filter(f => f.type === ABIType.Function).map(f => addIndent(generateContractFunction(f), 2)).join('\n');
    res += '\n}';
    return res;
}
//# sourceMappingURL=generator.js.map