import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushi: [],
    index: 0,
    fourSushi: [],
    emptyPlates: [],
    wallet: 100,
  };

  //Sushi {name, id, img_url, price}
  displaySushi = () => {
    let { index } = this.state
    let displaySush = this.state.sushi.slice(index, index + 4)
    for (let i = 0; i < displaySush.length; i++){
      displaySush[i].isEaten = false;
    }
    this.updateIndex(displaySush);
}

  updateIndex = (displaySush) => {
    this.setState({
      index: this.state.index + 4,
      fourSushi: displaySush
    })
  }

  eatMe = (id) => {
    let newId = (id - 1) % 4;
    if(!this.state.fourSushi[newId].isEaten && this.state.wallet > 0){
      // 1. Make a shallow copy of the items
      let fourSushi = [...this.state.fourSushi];
      // 2. Make a shallow copy of the item you want to mutate
      let item = { ...fourSushi[newId] };
      // 3. Replace the property you're intested in
      item.isEaten = true;
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      fourSushi[newId] = item;
      // 5. Set the state to our new copy
      this.setState({
        fourSushi,
        emptyPlates: [...this.state.emptyPlates, item],
        wallet: this.state.wallet - item.price,
      });
    } else {
      console.log("you fucked up");
    }
  }

  render() {
    return (
      <div className='app'>
        <SushiContainer eatMe={this.eatMe} show={this.displaySushi} fourPieces={this.state.fourSushi} />
        <Table wallet={this.state.wallet} fourSushi={this.state.fourSushi} emptyPlates={this.state.emptyPlates}/>
      </div>
    );
  }

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then(res => this.updateState(res))
      .catch((error) => console.error("ERROR: ", error));
  }

  componentDidUpdate() {
    if (this.state.sushi.length !== 0 && this.state.index === 0) {
      this.displaySushi();
  }
}

  updateState(arrSushi) {
    this.setState({
      sushi: arrSushi
    })
  }

}


export default App;
