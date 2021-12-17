export const getIndent = (len: number): string => {
  return ' '.repeat(len)
}

// add indent
export const addIndent = (str: string, indent: number) => {
  return getIndent(indent) + str.replace(/\n/g, '\n' + getIndent(indent))
}

// get file name for given file path
export const getFileName = (filePath: string): string => {
  const fullName = filePath.split('/').pop()
  return fullName?.split('.').shift() || ''
}