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

    displaySushi = () => {
        let { index } = this.state;
        if (index >= 100) {
            index = 0;
        }
        let displaySush = this.state.sushi.slice(index, index + 4);
        for (let i = 0; i < displaySush.length; i++) {
            let sushiTry = this.state.emptyPlates.findIndex((sush) => sush.id === displaySush[i].id);
            if (sushiTry === -1) {
                displaySush[i].isEaten = false;
            } else {
                displaySush[i].isEaten = true;
            }
        }
        this.updateIndex(index, displaySush);
    };

    updateIndex = (index, displaySush) => {
        this.setState({
            index: index + 4,
            fourSushi: displaySush,
        });
    };

    eatMe = (id) => {
        let newId = (id - 1) % 4;
        if (!this.state.fourSushi[newId].isEaten && this.state.wallet >= this.state.fourSushi[newId].price) {
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
        }
    };

    render() {
        return (
            <div className="app">
                <SushiContainer eatMe={this.eatMe} show={this.displaySushi} fourPieces={this.state.fourSushi} />
                <Table
                    wallet={this.state.wallet}
                    fourSushi={this.state.fourSushi}
                    emptyPlates={this.state.emptyPlates}
                    addMoney={this.addMoney}
                />
            </div>
        );
    }

    addMoney = (e) => {
        e.preventDefault();
        let moneyToAdd;
        if (e.target.money.value === "") {
            moneyToAdd = 0;
        } else {
            moneyToAdd = parseInt(e.target.money.value);
        }
        e.target.money.value = "";
        this.setState({
            wallet: this.state.wallet + moneyToAdd,
        });
    };

    componentDidMount() {
        fetch(API)
            .then((res) => res.json())
            .then((res) => this.updateState(res))
            .catch((error) => console.error("ERROR: ", error));
    }

    componentDidUpdate() {
        if (this.state.sushi.length !== 0 && this.state.index === 0) {
            this.displaySushi();
        }
    }

    updateState(arrSushi) {
        this.setState({
            sushi: arrSushi,
        });
    }
}

export default App;
