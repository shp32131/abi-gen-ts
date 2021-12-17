"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./gen/generator");
const fs_1 = __importDefault(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("./utils");
const helpers_1 = require("yargs/helpers");
function cli(argv) {
    return (0, yargs_1.default)((0, helpers_1.hideBin)(argv))
        .usage('Usage: $0 generate [abiFile] [contractName] [outputFile]')
        .command('generate [abiFile] [contractName] [outputFile]', 'generate typescript class for given ABI', (yargs) => {
        var _a, _b;
        return (_b = (_a = yargs.positional('abiFile', {
            describe: 'Input ABI JSON file',
            type: 'string'
        })) === null || _a === void 0 ? void 0 : _a.positional('contractName', {
            describe: 'Contract name',
            type: 'string'
        })) === null || _b === void 0 ? void 0 : _b.positional('outputFile', {
            describe: 'Output typescript file',
            type: 'string'
        });
    }, (argv) => {
        let abi;
        try {
            const file = fs_1.default.readFileSync(argv.abiFile).toString('utf-8');
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
        const cName = argv.contractName || (0, utils_1.getFileName)(argv.abiFile);
        const code = (0, generator_1.generateTSCode)(cName, abi);
        const output = argv.outputFile ? `./${argv.outputFile}.ts` : `./abi/${(0, utils_1.getFileName)(argv.abiFile)}.ts`;
        fs_1.default.writeFileSync(output, code);
    }).help().argv;
}
cli(process.argv);
//# sourceMappingURL=index.js.map