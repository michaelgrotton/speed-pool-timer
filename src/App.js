import React from 'react';
import { Button, Card, Statistic, Grid } from 'semantic-ui-react'
import UIfx from 'uifx'
import toneAudio from "./tone.mp3"
import endAudio from "./end.mp3"

const tone = new UIfx(
  toneAudio,
  {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)

const end = new UIfx(
  endAudio,
  {
    volume: 0.5, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {seconds: 5, duration: 5}
    this.timer = 0
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000)
  }

  resetTimer = () => {
    clearInterval(this.timer)
    this.setState({seconds: 5})
  }

  countDown = () => {
    let seconds = this.state.seconds - 1;
    if(seconds == 0) {
      seconds =  5
      end.play()
    } else if (seconds < 4) {
      tone.play()
    }

    this.setState({seconds})
  }

  render() {
    return (
      <Grid centered columns={1}>
        <div style={{marginTop:"100px"}}>
          <Card>
            <Card.Content header="Speed Pool is the second coming and only cowards won't acknowledge that" />
            <Card.Content extra>
              <Statistic horizontal style={{textAlign:"center"}}>
               <Statistic.Value>{this.state.seconds}</Statistic.Value>
               <Statistic.Label>Seconds</Statistic.Label>
             </Statistic>
            </Card.Content>
            <Card.Content>
              <div className='ui two buttons'>
              <Button color="green" onClick={this.startTimer}>Start</Button>
              <Button color="red" onClick={this.resetTimer}>Stop</Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </Grid>
    );
  }
}

export default App;
