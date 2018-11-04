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
    this.game = new hyperLOOP();
  }
 
   public render() {
    
    
      return (  
        <div className="App" />
      );
    
  }
}

export default App;