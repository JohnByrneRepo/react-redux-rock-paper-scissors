import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectGameType, resetScores } from './actions'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import { PLAYER_VS_CPU, CPU_VS_CPU } from '../../constants'

class MenuPage extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onClick(type) {
    this.props.resetScores()
    this.props.selectGameType(type)
    this.context.router.history.push('game')
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid menu-title">
          <Col xs={12} md={12}>
            <h3 className="text-center">Select game type</h3>
          </Col>
        </Row>          
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <div className="start-game-button-container" onClick={(event) => { this.onClick(PLAYER_VS_CPU) }}>
              <Button className="start-game-button">
                <Glyphicon glyph="user" />
                v
                <Glyphicon glyph="hdd" />
                <br />
                <span className="player-type">Player</span><span className="player-type">Cpu</span>
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="start-game-button-container" onClick={(event) => { this.onClick(CPU_VS_CPU) }}>
              <Button className="start-game-button">
                <Glyphicon glyph="hdd" />
                v
                <Glyphicon glyph="hdd" />
                <br />
                <span className="player-type">Cpu</span><span className="player-type">Cpu</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

MenuPage.propTypes = {
  selectGameType: PropTypes.func.isRequired,
  resetScores: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGameType: (gameType) => {
      dispatch(selectGameType(gameType))
    },
    resetScores: () => {
      dispatch(resetScores())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)