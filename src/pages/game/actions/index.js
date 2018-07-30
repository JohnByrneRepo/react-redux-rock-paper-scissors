import { UPDATE_SCORES, GET_GAME_TYPE } from './types'

export const updateScores = (playerId) => {
  return {
    type: UPDATE_SCORES,
    playerId
  }
}

export const getGameType = () => {
  return {
    type: GET_GAME_TYPE
  }
}
