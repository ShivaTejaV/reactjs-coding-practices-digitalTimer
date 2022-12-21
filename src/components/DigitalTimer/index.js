// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
    console.log('UNMOUNTED')
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreasingTimerLimit = () => {
    const {timerLimitInMinutes, isTimerRunning} = this.state
    if (!isTimerRunning) {
      if (timerLimitInMinutes > 0) {
        this.setState(prevState => ({
          timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
        }))
      }
    }
  }

  onIncreasingTimerLimit = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      }))
    }
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  timerController = () => {
    const {isTimerRunning} = this.state
    const pauseImageUrl =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const startImageUrl =
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    let imageUrl
    let altText

    if (isTimerRunning) {
      imageUrl = pauseImageUrl
      altText = 'pause icon'
    } else {
      imageUrl = startImageUrl
      altText = 'play icon'
    }

    return (
      <div className="timer-controller-container">
        <button type="button">
          <img
            src={imageUrl}
            alt={altText}
            onClick={this.onStartOrPauseTimer}
          />
          <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>

        <button type="button" onClick={this.onReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimeCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimeCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimeCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const status = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="elapsed-time-container">
          <h1 className="elapsed-time">
            {this.getElapsedSecondsInTimeFormat()}
          </h1>
          <p className="timer-state">{status}</p>
        </div>

        <div className="timer-controller-container">
          {this.timerController()}
          {this.renderTimerLimitController()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
