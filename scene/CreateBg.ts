import createContainer from "../utils/CreateConatiner";
import { Container,BlurFilter } from "pixi.js";

class CreateBg extends Container {
    private bg:createContainer
    private bg1:createContainer
    private app:any
    private blurfltr:any
    

    constructor(app:any){
        super()
        this.app=app
        this.bg=new createContainer('bg')
        this.bg1=new createContainer('bg')
        this.pivot.set(this.width/2,this.height/2)
        this.position.set(
            this.app.screen.width / 2,
            this.app.screen.height / 2
        );
        this.addChild(this.bg,this.bg1);

    }
    public buildBg(){
        //this.bg.position.set(this.app.screen.width/2,this.app.screen.height/2)
        this.bg.scale.set(0.6,0.6)
        //this.bg1.position.set(this.app.screen.width/2,this.app.screen.height/2)
        this.bg1.scale.set(0.5,0.55)
        this.blurfltr=new BlurFilter()
        this.blurfltr.strength=12
        this.bg.filters=[this.blurfltr]

    }

}


export default CreateBg