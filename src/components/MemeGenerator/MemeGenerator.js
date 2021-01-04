import React from "react";
import "./MemeGenerator.css";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      imgText: "",
      randomImage:
        "https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb",
      allMemeImgs: [],
      textList: [],
      left: 0,
      top: 0,
      fontsize: 2,
    };
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleClick = (event) => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const rendMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImage: rendMemeImg });
  };

  // When user saves a text
  handleNewText = (event) => {
    event.preventDefault();

    if (this.state.imgText === "") {
      alert("Metin kısmı boş olamaz!");
    } else {
      this.setState((prevState) => {
        var tmpTemplate = (
          <h2
            className="imgText"
            key={this.state.textList.length + 1}
            style={{
              top: this.state.top.toString() + "%",
              left: this.state.left.toString() + "%",
              fontSize: this.state.fontsize.toString() + "em",
            }}
          >
            {this.state.imgText}
          </h2>
        );
        var tmpArr = [...prevState.textList];
        tmpArr.push(tmpTemplate);

        return {
          imgText: "",
          left: 0,
          top: 0,
          fontsize: 2,
          textList: tmpArr,
        };
      });
    }
  };

  handleDeleteText = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      var tmpArr = [...prevState.textList];
      var tmpText;

      if (this.state.imgText !== "")
        // if there is text on the input box delete it first!
        tmpText = "";
      else if (tmpArr.length > 0) {
        tmpText = "";
        tmpArr.pop();
      } // else if delete the last text template that user saved!
      return {
        textList: tmpArr,
        imgText: tmpText,
      };
    });
  };

  render() {
    return (
      <div className="App-body">
        <form>
          <input
            name="imgText"
            type="text"
            placeholder="Metin"
            value={this.state.imgText}
            onChange={this.handleChange}
          ></input>
          <button
            name="addText"
            className="button"
            onClick={this.handleNewText}
          >
            <span> Kaydet </span>
          </button>
          <button
            name="deleteText"
            className="button"
            onClick={this.handleDeleteText}
          >
            <span> Geri Al </span>
          </button>
          <br></br>
          <label>
            Dikey : {this.state.top + "%"}
            <input
              name="top"
              className="slider"
              type="range"
              min="0"
              max="100"
              value={this.state.top}
              onChange={this.handleChange}
            ></input>
          </label>
          <br></br>
          <label>
            Yatay : {this.state.left + "%"}
            <input
              name="left"
              className="slider"
              type="range"
              min="0"
              max="100"
              value={this.state.left}
              onChange={this.handleChange}
            ></input>
          </label>
          <br></br>
          <label>
            Boyut : {this.state.fontsize}
            <input
              name="fontsize"
              className="slider"
              type="range"
              min="1"
              max="3"
              value={this.state.fontsize}
              onChange={this.handleChange}
            ></input>
          </label>
          <br></br>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          {this.state.textList}
          <h2
            className="imgText"
            style={{
              top: this.state.top.toString() + "%",
              left: this.state.left.toString() + "%",
              fontSize: this.state.fontsize.toString() + "em",
            }}
          >
            {this.state.imgText}
          </h2>
        </div>
        <br></br>
        <button name="selectImg" className="button" onClick={this.handleClick}>
          <span> Resim Değiştir </span>
        </button>
      </div>
    );
  }
}
export default MemeGenerator;
