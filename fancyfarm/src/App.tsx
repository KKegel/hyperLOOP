import * as React from 'react';

import './App.css';
import build from './main/scene';

class App extends React.Component {

  public componentDidMount(){
    build();
  }

  public render() {
    return (
      <div
        id="WHSAPP"
        style={{
          width: '100vw',
          height: '100vh'
        }}
      />
    );
  }
}

export default App;
