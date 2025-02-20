export class NotCheckinUSer extends Error {
  constructor() {
    super('Not exists check-ins with this user')
  }
}
