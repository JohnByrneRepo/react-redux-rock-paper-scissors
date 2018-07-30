import { SELECT_GAME_TYPE, RESET_SCORES } from './types'

export const selectGameType = (type) => {
  return {
    type: SELECT_GAME_TYPE,
    gameType: type
  }
}

export const resetScores = () => {
  return {
    type: RESET_SCORES
  }
}
