
import Updateable from "src/scene/Updateable";


class Wizard implements Updateable{

  private updateables :Set<Updateable>;

  constructor(){
    this.updateables = new Set();
  }

  addUpdateable(element :Updateable){
    this.updateables.add(element);
  }

  removeUpdateable(element :Updateable){
    this.updateables.delete(element);
  }

  update(dt :number){
    this.updateables.forEach(u => u.update(dt));
  }

}

export default Wizard;