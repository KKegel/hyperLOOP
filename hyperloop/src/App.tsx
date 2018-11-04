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
        <>
          <div className="App" />
          <div style={{
            position: 'absolute',
            bottom: 0
          }}>Music by <a target="_blank" href="http://freemusicarchive.org/music/Edward_Shallow/">Edward Shallow</a></div>
        </>
      );
    
  }
}

export default App;