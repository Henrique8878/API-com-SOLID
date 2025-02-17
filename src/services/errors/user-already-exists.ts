// instancia de Erros para tratar erros conhecidos

export class UserAlreadyExists extends Error {
  constructor() {
    super('User Already Exists')
  }
}
