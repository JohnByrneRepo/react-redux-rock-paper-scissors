import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { PLAYER_VS_CPU, CPU_VS_CPU } from '../../../constants'
import { ROCK, PAPER, SCISSORS } from '../../../constants'

export class RoundComplete extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    if (this.props.gameType === CPU_VS_CPU) {
      this.continueAfterDelay()
    }
  }

  continueAfterDelay() {
    setTimeout(() => {
      this.props.continueGame()
    }, 3000)
  }

  onClick() {
    this.props.continueGame()
  }

  render() {
    const { gameType, playerOneChoice, playerTwoChoice, roundWinner } = this.props

    return (
      <div>
        <Grid>
          <Row className="show-grid menu-title">
            <Col xs={12} md={12}>
              <h4 className="text-center">{roundWinner} won the round!</h4>
            </Col>
          </Row>
          <Row className="show-grid round-complete-row">
            <Col xs={12} md={6}>
              <div className="selection-button-container">
                {playerOneChoice === ROCK &&
                  <Button className="game-button"><img alt="icon" src="./images/rock.png"/></Button>
                }
                {playerOneChoice === PAPER &&
                  <Button className="game-button"><img alt="icon" src="./images/paper.png"/></Button>
                }
                {playerOneChoice === SCISSORS &&
                  <Button className="game-button"><img alt="icon" src="./images/scissors.png"/></Button>
                }
                <br/>
                Player 1 ({gameType === PLAYER_VS_CPU ? "Human" : "CPU"})
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="selection-button-container">
                {playerTwoChoice === ROCK &&
                  <Button className="game-button"><img alt="icon" src="./images/rock.png"/></Button>
                }
                {playerTwoChoice === PAPER &&
                  <Button className="game-button"><img alt="icon" src="./images/paper.png"/></Button>
                }
                {playerTwoChoice === SCISSORS &&
                  <Button className="game-button"><img alt="icon" src="./images/scissors.png"/></Button>
                }
                <br/>
                Player 2 (CPU)
              </div>
            </Col>
          </Row>
          {gameType === PLAYER_VS_CPU &&
            <Row className="show-grid menu-title">
              <Col xs={12} md={12}>
                <div className="text-center">
                  <Button className="continue-button" onClick={(event) => { this.onClick() }}>Continue</Button>
                </div>
              </Col>
            </Row>
          }
        </Grid>
      </div>
    )
  }
}

RoundComplete.propTypes = {
  gameType: PropTypes.number.isRequired,
  continueGame: PropTypes.func.isRequired,
  playerOneChoice: PropTypes.number.isRequired,
  playerTwoChoice: PropTypes.number.isRequired,
  roundWinner: PropTypes.string.isRequired
}

