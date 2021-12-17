import { generateTSCode } from "./gen/generator"
import fs from 'fs'
import yargs from 'yargs'
import { getFileName } from "./utils"

import { hideBin } from 'yargs/helpers'

function cli(argv: string[]) {
  return yargs(hideBin(argv))
  .usage('Usage: $0 [abiFile] [contractName] [outputFile]')
  .command(
    'generate [abiFile] [contractName] [outputFile]',
    'generate typescript class for given ABI',
    (yargs: any) => {
      yargs.positional('abiFile', {
        describe: 'Input ABI JSON file',
        type: 'string',
        default: './'
      })?.positional('contractName', {
        describe: 'Contract name',
        type: 'string'
      })?.positional('outputFile', {
        describe: 'Output typescript file',
        type: 'string'
      })
    },
    (argv: { abiFile: string, contractName?: string, outputFile?: string}) => {
      let abi;
      try {
        // get contract json file
        const abiFile = argv.abiFile || './src/contract-abi/erc20.json'
        const file = fs.readFileSync(abiFile).toString('utf-8')
        abi = JSON.parse(file)
      } catch (e) {
        console.error('Cannot read/parse input ABI file')
        return
      }
      if (!Array.isArray(abi)) {
        //TODO: transform abi be a array
        console.error('ABI should be array')
        return
      }
      // generate typescript class
      const cName = argv.contractName || getFileName(argv.abiFile)
      const code = generateTSCode(cName, abi)

      const output =argv.outputFile ? `./${argv.outputFile}.ts` : `./abi/${getFileName(argv.abiFile)}.ts`
      fs.writeFileSync(output, code)
    }
  ).help().argv
}

cli(process.argv)