import createContainer from "../utils/CreateConatiner.ts";
import { Container,BlurFilter } from "pixi.js";
import BuildApp from "../utils/BuildApp.ts";
import type CreateBg from "./CreateBg.ts";
import Transitions from '../utils/Transitions.ts'

class CreateIntro extends Container {
    private frame:createContainer
    private lBtn:createContainer
    private rBtn:createContainer
    private playBtn:createContainer
    private logo:createContainer
    private aFrame:createContainer
    private bFrame:createContainer
    private app:any
    private transit:Transitions



    constructor(app:any){
        super()
        this.transit=new Transitions()
        this.app=app
    
        this.frame=new createContainer('frame1')
        this.lBtn=new createContainer('lBtn')
        this.rBtn=new createContainer('rBtn')
        this.playBtn=new createContainer('pNBtn')
        this.logo=new createContainer('logo')
        this.aFrame=new createContainer('aFrame')
        this.bFrame=new createContainer('bFrame')

        //this.addChild(this.frame)
    }

    public buildIntro(bg:CreateBg,cb:Function){
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

        this.transit.hoverTransition(this.playBtn,'pDBtn','pNBtn')

        this.transit.clickTransition(this.playBtn,'pDBtn','pNBtn',{value:true},()=>{bg.removeChild(this)
            cb()
        })

        
        this.transit.clickTransition(this.lBtn,'lBtn','lBtn',{value:true},
            ()=>{
                this.frame.changeTexture('frame1')
                this.aFrame.changeTexture('aFrame')
                this.bFrame.changeTexture('bFrame')
                this.frame.scale.set(0.5)
            }
        )

        this.transit.clickTransition(this.rBtn,'rBtn','rBtn',{value:true},
            ()=>{
                this.frame.changeTexture('frame2')
                this.bFrame.changeTexture('aFrame')
                this.aFrame.changeTexture('bFrame')
                this.frame.scale.set(0.4)
            }
        )
        
    }

}


export default CreateIntro