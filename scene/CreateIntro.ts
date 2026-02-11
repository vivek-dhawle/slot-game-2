import createContainer from "../utils/CreateConatiner.ts";
import { Container} from "pixi.js";
import AssetsLoader from "../utils/AssetLoader.ts";
import type CreateBg from "./CreateBg.ts";
import Transitions from '../utils/Transitions.ts'

class CreateIntro extends Container {
    private frame:createContainer
    private lBtn:createContainer
    private rBtn:createContainer
    public playBtn:createContainer
    private logo:createContainer
    private aFrame:createContainer
    private bFrame:createContainer

    private transit:Transitions



    constructor(){
        super()
        this.transit=new Transitions()
        AssetsLoader.loadIntro()

    
        this.frame=new createContainer('frame1.png')
        this.lBtn=new createContainer('ptLeftArrowBtn.png')
        this.rBtn=new createContainer('ptRightArrowBtn.png')
        this.playBtn=new createContainer('prePlayBtn_normal.png')
        this.logo=new createContainer('gameLogo.png')
        this.aFrame=new createContainer('pagerMaker.png')
        this.bFrame=new createContainer('pagerBase.png')

        //this.addChild(this.frame)
    }

    public buildIntro(bg:CreateBg){
        this.addChild(this.frame,this.lBtn,this.rBtn,this.playBtn,this.logo,this.aFrame,this.bFrame)
        bg.addChild(this)

        this.frame.position.set(0,-50)
        this.frame.scale.set(0.5)

        this.lBtn.position.set(-400,-50)
        this.rBtn.position.set(400,-50)
        this.logo.position.set(0,-300)
        this.logo.scale.set(0.53)
        this.aFrame.position.set(-25,200)
        this.bFrame.position.set(25,200)

        this.aFrame.scale.set(0.5)
        this.bFrame.scale.set(0.5)
        //this.frame.changeTexture('frame2')

        this.playBtn.scale.set(0.4)
        this.playBtn.position.set(0,300)

        this.transit.hoverTransition(this.playBtn,'prePlayBtn_down.png','prePlayBtn_normal.png')

        this.transit.clickTransition(this.playBtn,'prePlayBtn_down.png','prePlayBtn_normal.png',{value:true},async ()=>{bg.removeChild(this)
             this.playBtn.emit('startPlay')
        })

        
        this.transit.clickTransition(this.lBtn,'ptLeftArrowBtn.png','ptLeftArrowBtn.png',{value:true},
            ()=>{
                this.frame.changeTexture('frame1.png')
                this.aFrame.changeTexture('pagerMaker.png')
                this.bFrame.changeTexture('pagerBase.png')
                this.frame.scale.set(0.5)
            }
        )

        this.transit.clickTransition(this.rBtn,'ptRightArrowBtn.png','ptRightArrowBtn.png',{value:true},
            ()=>{
                this.frame.changeTexture('frame2.png')
                this.bFrame.changeTexture('pagerMaker.png')
                this.aFrame.changeTexture('pagerBase.png')
                this.frame.scale.set(0.4)
            }
        )
        
    }

}


export default CreateIntro