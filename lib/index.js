"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./gen/generator");
const fs_1 = __importDefault(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const { hideBin } = require('yargs/helpers');
function cli(argv) {
    return (0, yargs_1.default)(hideBin(argv))
        .usage('Usage: $0 generate [abiFile] [contractName] [outputFile]')
        .command('generate [abiFile] [contractName] [outputFile]', 'generate typescript class for given ABI', (yargs) => {
        return yargs.positional('abiFile', {
            describe: 'Input ABI JSON file',
            type: 'string'
        })
            .positional('contractName', {
            describe: 'Contract name',
            type: 'string'
        })
            .positional('outputFile', {
            describe: 'Output typescript file',
            type: 'string'
        });
    }, (argv) => {
        let abi;
        try {
            let file = fs_1.default.readFileSync(argv.abiFile).toString('utf-8');
            abi = JSON.parse(file);
        }
        catch (e) {
            console.error('Cannot read/parse input ABI file');
            return;
        }
        if (!Array.isArray(abi)) {
            console.error('ABI should be array');
            return;
        }
        const code = (0, generator_1.generateTSCode)(argv.contractName, abi);
        fs_1.default.writeFileSync(argv.outputFile, code);
    }).help().argv;
}
cli(process.argv);
//# sourceMappingURL=index.js.map