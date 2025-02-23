export class ItIsNotPossibleValidatedCheckinAfterTwentyMinutes extends Error {
  constructor() {
    super('It is not possible validate check-in after twenty minutes')
  }
}
