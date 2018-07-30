import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGameType, updateScores } from './actions'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { PLAYER_VS_CPU, CPU_VS_CPU } from '../../constants'
import { ROCK, PAPER, SCISSORS } from '../../constants'
import { PLAYER_ONE, PLAYER_TWO, NONE } from '../../constants'
import { RoundComplete } from './components/RoundComplete'

const WINNER_NAMES = ['Player 1', 'Player 2', 'No-one']

class GamePage extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.continueGame = this.continueGame.bind(this)
    this.clickReturnToMenu = this.clickReturnToMenu.bind(this)
    this.state = {
      winner: NONE,
      winnerName: 'No-one',
      round: 1,
      makingSelection: true,
      choices: [0, 0],
      cpuChoosing: true,
      gameComplete: false,
      gameWinner: 'No-one'
    }
    if (this.props.gameType === CPU_VS_CPU) {
      this.simulateCpuChoices()
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.mounted = true
    this.props.getGameType()
    this.forceUpdate()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  simulateCpuChoices() {
    setTimeout(() => {
      this.selectCpuChoice(PLAYER_ONE)
      this.selectCpuChoice(PLAYER_TWO)
      let roundWinner = this.determineOutcome()
      let roundWinnerName = WINNER_NAMES[roundWinner]
      if (this.mounted) {
        this.setState({
          winner: roundWinner,
          winnerName: roundWinnerName,
          makingSelection: false
        })
        this.props.updateScores(roundWinner)
      }
    }, 3000)
  }

  selectCpuChoice(player) {
    let random = Math.floor(Math.random()*3)
    let newChoices = this.state.choices
    newChoices[player] = random
    if (this.mounted) {
      this.setState({ choices: newChoices })
    }
  }

  determineOutcome() {
    let playerOneChoice = this.state.choices[PLAYER_ONE]
    let playerTwoChoice = this.state.choices[PLAYER_TWO]
    let winner = 0
    switch(playerOneChoice) {
      case ROCK:
        switch (playerTwoChoice) {
          case ROCK: winner = NONE; break;
          case PAPER: winner = PLAYER_TWO; break;
          case SCISSORS: winner = PLAYER_ONE; break;
          default: return
        }
      break
      case PAPER:
        switch (playerTwoChoice) {
          case ROCK: winner = PLAYER_ONE; break;
          case PAPER: winner = NONE; break;
          case SCISSORS: winner = PLAYER_TWO; break;
          default: return
        }
      break
      case SCISSORS:
        switch (playerTwoChoice) {
          case ROCK: winner = PLAYER_TWO; break;
          case PAPER: winner = PLAYER_ONE; break;
          case SCISSORS: winner = NONE; break;
          default: return
        }
      break
      default: return
    }
    return winner
  }

  onClick(selection) {
    let newChoices = this.state.choices
    newChoices[PLAYER_ONE] = selection
    this.selectCpuChoice(PLAYER_TWO)
    let roundWinner = this.determineOutcome()
    let roundWinnerName = WINNER_NAMES[roundWinner]
    if (this.mounted) {
      this.setState({
        winner: roundWinner,
        winnerName: roundWinnerName,
        makingSelection: false,
        choices: newChoices
      })
      this.props.updateScores(roundWinner)
      this.forceUpdate()
    }
  }

  checkMatchWinner() {
    let matchWinner = WINNER_NAMES[NONE]
    if (this.props.scores[PLAYER_ONE] === 3) {
      matchWinner = WINNER_NAMES[PLAYER_ONE]
    }
    if (this.props.scores[PLAYER_TWO] === 3) {
      matchWinner = WINNER_NAMES[PLAYER_TWO]
    }
    return matchWinner
  }

  endGame(winner) {
    this.setState({
      makingSelections: false,
      gameComplete: true,
      gameWinner: winner
    })
  }

  continueGame() {
    let newRound = this.state.round
    newRound = newRound + 1
    if (this.mounted) {
      if (newRound < 6) {
        this.setState({ round: newRound, makingSelection: true })
        this.forceUpdate()
        if (this.props.gameType === CPU_VS_CPU) {
          this.simulateCpuChoices()
        }
        let checkWinner = this.checkMatchWinner()
        if (checkWinner !== 'No-one') {
          this.endGame(checkWinner)
        }
      } else {
        let checkWinner = this.checkMatchWinner()
        this.endGame(checkWinner)
      }
    }
  }

  clickReturnToMenu() {
    this.context.router.history.push('/')
  }

  render() {
    const { gameType, scores } = this.props

    return (
      <div>
        {gameType !== undefined &&
          <Grid>
            <Row className="show-grid menu-title">
              <Col xs={12} md={12}>
                <h3 className="text-center">Rock, Paper, Scissors</h3>
              </Col>
            </Row>
            <Row className="show-grid menu-title">
              <Col xs={12} md={12}>
                <h4 className="text-center">Round {this.state.round}</h4>
              </Col>
            </Row>
            {scores !== undefined &&
              <Row className="show-grid menu-title">
                <Col xs={12} md={12}>
                  <h5 className="text-center">Scores</h5>
                  <h6 className="text-center">
                    Player 1 ({gameType === PLAYER_VS_CPU ? "Human" : "CPU"}): {scores[0]}
                  </h6>
                  <h6 className="text-center">
                    Player 2 (CPU): {scores[1]}
                  </h6>
                </Col>
              </Row>
            }
            {this.state.makingSelection ?
              <div>
                {gameType === PLAYER_VS_CPU ?
                  <div>
                    <Row className="show-grid menu-title">
                      <Col xs={12} md={12}>
                        <h4 className="text-center">Make your selection</h4>
                      </Col>
                    </Row>
                    <Row className="show-grid selection-row">
                      <Col xs={12} md={4}>
                        <div className="selection-button-container pull-right" onClick={(event) => { this.onClick(0) }}>
                          <Button className="game-button">
                            <img alt="icon" src="./images/rock.png"/>
                          </Button>
                        </div>
                      </Col>
                      <Col xs={12} md={4}>
                        <div className="selection-button-container" onClick={(event) => { this.onClick(1) }}>
                          <Button className="game-button">
                            <img alt="icon" src="./images/paper.png"/>
                          </Button>
                        </div>
                      </Col>
                      <Col xs={12} md={4}>
                        <div className="selection-button-container pull-left" onClick={(event) => { this.onClick(2) }}>
                          <Button className="game-button">
                            <img alt="icon" src="./images/scissors.png"/>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  :
                  <div>
                    {this.state.cpuChoosing &&
                      <h5 className="text-center">CPU making selections..</h5>
                    }
                  </div>
                }
              </div>
              :
              <div>
                {!this.state.gameComplete ?
                  <RoundComplete
                    gameType={gameType}
                    continueGame={this.continueGame}
                    playerOneChoice={this.state.choices[PLAYER_ONE]}
                    playerTwoChoice={this.state.choices[PLAYER_TWO]}
                    roundWinner={this.state.winnerName}
                  />
                  :
                  <div>
                    <Row className="show-grid menu-title">
                      <Col xs={12} md={12}>
                        <h4 className="text-center">{this.state.gameWinner} won the match</h4>
                        <div className="text-center">
                          <Button
                            className="continue-button return-button"
                            onClick={(event) => { this.clickReturnToMenu() }}>
                              Return to menu
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                }
              </div>
            }
          </Grid>
        }
      </div>
    )
  }
}

GamePage.propTypes = {
  getGameType: PropTypes.func.isRequired,
  updateScores: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { gameState  } = state

  const {
    gameType,
    scores
  } = gameState || {
    gameType: PLAYER_VS_CPU,
    scores: [0, 0]
  }

  return {
    gameType,
    scores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGameType: () => {
      dispatch(getGameType())
    },
    updateScores: (playerId) => {
      dispatch(updateScores(playerId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)