export class CheckinNotAllowedOnTheSameDay extends Error {
  constructor() {
    super('checkin not allowed on the same day')
  }
}
