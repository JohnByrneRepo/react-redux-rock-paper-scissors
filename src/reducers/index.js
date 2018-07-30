import { combineReducers } from 'redux'
import { SELECT_GAME_TYPE, RESET_SCORES } from '../pages/menu/actions/types'
import { UPDATE_SCORES, GET_GAME_TYPE } from '../pages/game/actions/types'
import { PLAYER_VS_CPU } from '../constants'

const gameState = (state = {
  gameType: PLAYER_VS_CPU,
  scores: [0, 0]
}, action) => {
  switch (action.type) {
    case UPDATE_SCORES:
      let newScores = state.scores
      newScores[action.playerId]++
      return Object.assign({}, state, {
        scores: newScores
      })
    case RESET_SCORES:
      return Object.assign({}, state, {
        scores: [0, 0]
      })
    case SELECT_GAME_TYPE:
      return Object.assign({}, state, {
        gameType: action.gameType
      })
    case GET_GAME_TYPE:
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  gameState
})

export default rootReducer