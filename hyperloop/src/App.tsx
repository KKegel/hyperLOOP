import * as React from 'react';

import './App.css';
import build from './main/scene';
import hyperLOOP from './main/scene';


class App extends React.Component{

  private game :hyperLOOP;

  public componentDidMount(){
    this.start();
  }

  start(){
    //window.alert("move your mouse to change directions!");
    this.game = new hyperLOOP(() => {
      window.alert("you are dead, reload to play again (ctrl+r)");
      delete this.game;
      //this.start();
    });
  }
 
   public render() {
    
    
      return (  
        <div className="App" />
      );
    
  }
}

export default App;