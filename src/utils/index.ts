export const getIndent = (len: number): string => {
  return ' '.repeat(len)
}

// add indent
export const addIndent = (str: string, indent: number) => {
  return getIndent(indent) + str.replace(/\n/g, '\n' + getIndent(indent))
}