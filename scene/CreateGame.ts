import createContainer from "../utils/CreateConatiner.ts";

import Transitions from '../utils/Transitions.ts'
import { Container,Text,Application,BitmapText,BitmapFont,Assets} from "pixi.js";
import Account from '../utils/accounts.ts'
import CreateReels from './CreateReels.ts'
import fetchBal from '../utils/api.ts'
import "@esotericsoftware/spine-pixi-v8";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

class createGame extends Container{
    private reelContainer
    private playBtn:createContainer
    private autoPlay:createContainer
    private turbo:createContainer
    private incStake:createContainer
    private decStake:createContainer
    private balance:createContainer
    private stake:createContainer
    private Accounts:Account
    private playContainer:createContainer
    
    private stakeContainer:createContainer
    private transit:Transitions
    private text!:Text
    private stakeValue!:Text
    private val:number=20
    private playState:{value:boolean}={value:true}
    private autoState:{value:boolean}={value:true}
    private turboState:{value:boolean}={value:true}
    private reels:CreateReels
    private app:Application
    private logo:createContainer
    private logoSpine:any
    private majorSpine:any
    private miniSpine:any
    private minorSpine:any
    private grandSpine:any

    private majorText:any
    private miniText:any
    private minorText:any
    private grandText:any
    

    constructor(app:Application){
        super()

        this.transit=new Transitions()

        this.Accounts=new Account()
        this.reels=new CreateReels(app)
        this.playContainer=new createContainer()
        
        this.stakeContainer=new createContainer()

        this.reelContainer=new createContainer('reelframe.png')
        this.playBtn=new createContainer('spineBtn_main_normal.png')
        this.autoPlay=new createContainer('menu_autospin_normal.png')
        this.turbo=new createContainer('menu_quickSpin_normal.png')
        this.incStake=new createContainer('plusIcon_normal.png')
        this.decStake=new createContainer('minusIcon_normal.png')
        this.app=app
        this.balance=new createContainer()
        this.stake=new createContainer()
        this.logo=new createContainer()

   

       
    }


    private async topPanel  (){
         this.logoSpine=Spine.from({
            skeleton:"logo.json",atlas:"logo.atlas"
        })
       this.majorSpine=Spine.from({
        skeleton:"jackpot.json",atlas:"jackpot.atlas"
       })

        this.miniSpine=Spine.from({
        skeleton:"jackpot.json",atlas:"jackpot.atlas"
       })
        this.minorSpine=Spine.from({
        skeleton:"jackpot.json",atlas:"jackpot.atlas"
       })
        this.grandSpine=Spine.from({
        skeleton:"jackpot.json",atlas:"jackpot.atlas"
       })

       
       this.majorText=new BitmapText(`$${this.val*2000}`,{fontFamily:'bitmap-export',fontSize:50,fill:0xD1A14A,fontWeight:'bold'})
       
       this.miniText=new BitmapText(`$${this.val*20}`,{fontFamily:'bitmap-export',fontSize:50,fill:0xD1A14A,fontWeight:'bold'})
       this.minorText=new BitmapText(`$${this.val*100}`,{fontFamily:'bitmap-export',fontSize:50,fill:0xD1A14A,fontWeight:'bold'})
       this.grandText=new BitmapText(`$${this.val*5000}`,{fontFamily:'bitmap-export',fontSize:50,fill:0xD1A14A,fontWeight:'bold'})


       this.majorSpine.addChild(this.majorText)
       this.minorSpine.addChild(this.minorText)

       this.grandSpine.addChild(this.grandText)
       this.miniSpine.addChild(this.miniText)


       this.miniText.anchor.set(0.5,0);
        this.minorText.anchor.set(0.5,0);
         this.majorText.anchor.set(0.5,0);
          this.grandText.anchor.set(0.5,0);


       this.reelContainer.addChild(this.logo)
        this.logo.position.set(0,-0.9*this.reelContainer.height)

        this.logo.scale.set(1,1.1)


        this.grandSpine.position.set(-1.1*this.logoSpine.width,0)
        this.majorSpine.position.set(-0.7*this.logoSpine.width,0)
        
        this.minorSpine.position.set(0.7*this.logoSpine.width,0)
        this.miniSpine.position.set(1.1*this.logoSpine.width,0)

       


        this.logoSpine.state.setAnimation(0,'animation',false)
         this.majorSpine.state.setAnimation(0,'major',false)
          this.miniSpine.state.setAnimation(0,'mini',false)
           this.minorSpine.state.setAnimation(0,'minor',false)
            this.grandSpine.state.setAnimation(0,'grand',false)

       this.logo.addChild(this.logoSpine,this.majorSpine,this.miniSpine,this.minorSpine,this.grandSpine)

       setInterval(()=>{
            this.logoSpine.state.setAnimation(0,'animation',false)
            this.majorSpine.state.setAnimation(0,'major',false)
            this.miniSpine.state.setAnimation(0,'mini',false)
           this.minorSpine.state.setAnimation(0,'minor',false)
            this.grandSpine.state.setAnimation(0,'grand',false)
        },5000)
        
    }

    private buildPlayPanelButton(){
        this.playContainer.scale.set(0.6)

        this.playContainer.addChild(this.playBtn,this.autoPlay,this.turbo)
        this.playBtn.position.set(0,0)
        this.autoPlay.position.set(-1*(5+this.playBtn.width),0)
        this.turbo.position.set(5+this.playBtn.width,0)
        this.playContainer.position.set(0,300)


        this.reels.Tween.on('startSpin',async ()=>{
            let data
           try {
             data=await fetchBal(this.Accounts.getBalance(),this.val)
 
 
                 
           } catch (error) {
            data= this.Accounts.getBalance()-this.val

           }
             this.Accounts.decreaseBalnce(this.val)
                this.text.text=`$${data.balance?data.balance:data}\nBalance`
        })
        this.transit.hoverTransition(this.playBtn,'spineBtn_main_hover.png','spineBtn_main_normal.png')
        this.transit.hoverTransition(this.autoPlay,'menu_autospin_hover.png','menu_autospin_normal.png','menu_autospin_down.png','menu_autospin_down.png',this.autoState)
        this.transit.hoverTransition(this.turbo,'menu_quickSpin_hover.png','menu_quickSpin_normal.png','menu_quickSpin_down.png','menu_quickSpin_down.png',this.turboState)
       

        this.transit.clickTransition(this.playBtn,'spineBtn_main_disabled.png','spineBtn_main_normal.png',this.playState,()=>{
             
                
                this.playBtn.children[0].eventMode='none'
            
                this.reels.Tween.startSpin()
            this.reels.Tween.on('changeBtn',()=>{
                this.playState.value=true

                this.playBtn.changeTexture('spineBtn_main_normal.png')
                this.playBtn.children[0].eventMode='static'
                
            },2000)
        })
        let id:any=null

        

        this.transit.clickTransition(this.autoPlay,'menu_autospin_down.png','menu_autospin_normal.png',this.autoState,()=>{
            if (!this.autoState.value) {
             
                this.reels.Tween.startSpin()
                id=setInterval(()=>{
                    this.reels.Tween.startSpin()
                },2000)
                this.playBtn.changeTexture('spineBtn_main_disabled.png')
            } else {
                
                this.playBtn.changeTexture('spineBtn_main_normal.png')
                clearInterval(id)
                
            }
        })
        this.transit.clickTransition(this.turbo,'menu_quickSpin_down.png','menu_quickSpin_normal.png',this.turboState,()=>{
            if (!this.turboState.value) {
             
               this.reels.Tween.turbo=false
            } else {
                
                this.reels.Tween.turbo=true
                
            }
        })
        

        this.addChild(this.playContainer)
    }
    private buildAccountPanel(){

        this.text=new Text({
            text:`$${this.Accounts.getBalance()}\nBalance`,
            style:{
                fontSize:20,
                fontFamily:'Arial',
                fill:0xffffff,
                fontWeight:'500',
                align:'center'
            }
        })
        this.balance.addChild(this.text)
        this.balance.position.set(-600,300)
        this.addChild(this.balance)

    }
    private buildStakePanel(){
        this.stakeValue=new Text({
            text:`$${this.val}\n stake`,
            style:{
                fontSize:20,
                fontFamily:'Arial',
                fill:0xffffff,
                fontWeight:'500',
                align:'center'
            }
        })
        this.stakeValue.anchor.set(0.5)
        this.stake.addChild(this.stakeValue)
        
        
        this.incStake.position.set(-1*(this.stake.width+25),0)
        this.decStake.position.set(this.stake.width+25,0)

        this.incStake.scale.set(0.5)
        this.decStake.scale.set(0.5)

        this.stakeContainer.position.set(500,350)
        this.stakeContainer.addChild(this.stake,this.incStake,this.decStake)
        this.addChild(this.stakeContainer)


        this.transit.clickTransition(this.incStake,'plusIcon_normal.png','plusIcon_normal.png',{value:true},()=>{
            if(this.val+20>=100||this.val>=100){
                this.incStake.changeTexture('plusIcon_disabled.png')
                //this.incState.value=false
             }
            if(this.val>=100)return
           
            this.val+=20
            this.stakeValue.text=`$${this.val}\n stake`
            //this.deccState.value=true
            this.majorText=`$${this.val*2000}`
       
            this.miniText.text=`$${this.val*20}`
            this.minorText.text=`$${this.val*100}`
            this.grandText.text=`$${this.val*5000}`
                    
            if(this.val>=20)this.decStake.changeTexture('minusIcon_normal.png')
        })


        this.transit.clickTransition(this.decStake,'minusIcon_normal.png','minusIcon_normal.png',{value:true},()=>{
            
             if(this.val-20<=20||this.val<=20){
                this.decStake.changeTexture('minusIcon_disabled.png')
                
            }
            if(this.val<=20)return
            
            this.val-=20
            this.stakeValue.text=`$${this.val}\n stake`

            this.majorText=`$${this.val*2000}`
       
            this.miniText.text=`$${this.val*20}`
            this.minorText.text=`$${this.val*100}`
            this.grandText.text=`$${this.val*5000}`
            
            if(this.val<=80)this.incStake.changeTexture('plusIcon_normal.png')

        })

        

    }

     public buildGame(){
        this.addChild(this.reelContainer)
        this.reelContainer.scale.set(0.5)

        this.reels.buildReels(this.reelContainer)
        

        this.reelContainer.addChild(this.reels)
        this.buildPlayPanelButton()
        this.buildAccountPanel()
        this.buildStakePanel()
        this.topPanel()


        



        
        




        // const long= Spine.from(
        //     { skeleton: "HV1_longhorn.json", atlas: "HV1_longhorn.atlas" }
        // )
        // long.state.setAnimation(1, "animation", false)
        //   console.log(long.state.tracks);

        //   long.eventMode='static'
        //   long.on("pointerdown", () => {
        //     long.state.setAnimation(1, "animation", false);
        //     long.state.addAnimation(1, "animation", true, 0);
        // });
        // this.addChild(long)


        
    }

}


export default createGame