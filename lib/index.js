import { generateTSCode } from "./gen/generator";
import fs from 'fs';
import yargs from 'yargs';
import { getFileName } from "./utils";
import { hideBin } from 'yargs/helpers';
function cli(argv) {
    return yargs(hideBin(argv))
        .usage('Usage: $0 [abiFile] [contractName] [outputFile]')
        .command('generate [abiFile] [contractName] [outputFile]', 'generate typescript class for given ABI', (yargs) => {
        var _a, _b;
        (_b = (_a = yargs.positional('abiFile', {
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
            const abiFile = argv.abiFile || './src/contract-abi/erc20.json';
            const file = fs.readFileSync(abiFile).toString('utf-8');
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
        const cName = argv.contractName || getFileName(argv.abiFile);
        const code = generateTSCode(cName, abi);
        const output = argv.outputFile ? `./${argv.outputFile}.ts` : `./abi/${getFileName(argv.abiFile)}.ts`;
        fs.writeFileSync(output, code);
    }).help().argv;
}
cli(process.argv);
//# sourceMappingURL=index.js.map