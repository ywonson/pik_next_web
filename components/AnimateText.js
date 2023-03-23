import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

class AnimateText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    this.onRest = this.onRest.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({
          value: 1
        });
      }, 2800); // Delay of 1 second (1000 milliseconds)
    }

  onRest() {
    this.setState({
      value: 0
    });
  }

  render() {
    const { text } = this.props;
    const { value } = this.state;

    return (
      <Motion
        defaultStyle={{ x: 0 }}
        style={{ x: spring(value, { stiffness: 120, damping: 15 }) }}
        onRest={this.onRest}
      >
        {({ x }) => (
          <div style={{ transform: `translate3d(${x * 30}px, 0, 0)` }}>
            <h1>{text}</h1>
          </div>
        )}
      </Motion>
    );
  }
}

export default AnimateText;