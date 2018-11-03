import * as React from 'react';

import './App.css';
import build from './main/scene';

class App extends React.Component {

  private dead :boolean;

  constructor(props){
    super(props);
    this.dead = false;
  }

  public componentDidMount(){
    build(() => {
      //you are dead
      if(!this.dead){
        window.confirm('you are dead');
      }
      this.dead = true;
    });
  }

  public render() {
    
    return (
      <div className="App" />
    );
  }
}

export default App;