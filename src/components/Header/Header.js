import React from "react";
import "./Header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: new Date().getHours(),
      minute:
        (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          hour: new Date().getHours(),
          minute: (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes(),
        }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App-header">
        <time>{this.state.hour + ":" + this.state.minute}</time>
        <img
          className="App-logo"
          src="https://www.freepngimg.com/thumb/trollface/2-2-trollface-picture-thumb.png"
          alt="Problem?"
        />
        <h1>Meme Generator</h1>
      </div>
    );
  }
}
export default Header;
