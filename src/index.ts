import { generateTSCode } from "./gen/generator"
import fs from 'fs'
import yargs from 'yargs'

const { hideBin }  = require('yargs/helpers')

function cli(argv: string[]) {
  return yargs(hideBin(argv))
  .usage('Usage: $0 generate [abiFile] [contractName] [outputFile]')
  .command(
    'generate [abiFile] [contractName] [outputFile]',
    'generate typescript class for given ABI',
    (yargs: any) => {
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
      })
    },
    (argv: { abiFile: string, contractName: string, outputFile: string}) => {
      let abi;
      try {
        let file = fs.readFileSync(argv.abiFile).toString('utf-8')
        abi = JSON.parse(file)
      } catch (e) {
        console.error('Cannot read/parse input ABI file')
        return
      }
      if (!Array.isArray(abi)) {
        //TODO transform abi be a array
        console.error('ABI should be array')
        return
      }
      const code = generateTSCode(argv.contractName, abi)
      fs.writeFileSync(argv.outputFile, code)
    }
  ).help().argv
}

cli(process.argv)