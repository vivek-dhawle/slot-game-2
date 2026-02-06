import createContainer from "../utils/CreateConatiner.ts";
import type CreateBg from "./CreateBg.ts";
import Transitions from '../utils/Transitions.ts'
import { Container,Text} from "pixi.js";
import Account from '../utils/accounts.ts'
import CreateReels from './CreateReels.ts'

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
    private text:any
    private stakeValue:any
    private val:number=20
    private playState:any={value:true}
    private autoState:any={value:true}
    private turboState:object={value:true}
    

    private reels:CreateReels
    private app:any

    constructor(app:any){
        super()

        this.transit=new Transitions()

        this.Accounts=new Account()
        this.reels=new CreateReels(app)
        this.playContainer=new createContainer()
        
        this.stakeContainer=new createContainer()

        this.reelContainer=new createContainer('reelFrame')
        this.playBtn=new createContainer('spin')
        this.autoPlay=new createContainer('autoSpin')
        this.turbo=new createContainer('turbo')
        this.incStake=new createContainer('plus')
        this.decStake=new createContainer('minus')
        this.app=app
        this.balance=new createContainer()
        this.stake=new createContainer()
    }

    private buildPlayPanelButton(){
        this.playContainer.scale.set(0.6)

        this.playContainer.addChild(this.playBtn,this.autoPlay,this.turbo)
        this.playBtn.position.set(0,0)
        this.autoPlay.position.set(-1*(5+this.playBtn.width),0)
        this.turbo.position.set(5+this.playBtn.width,0)
        this.playContainer.position.set(0,300)



        this.transit.hoverTransition(this.playBtn,'spinH','spin')
        this.transit.hoverTransition(this.autoPlay,'autoSpinH','autoSpin','autoSpinD','autoSpinD',this.autoState)
        this.transit.hoverTransition(this.turbo,'turboH','turbo')


       

        this.transit.clickTransition(this.playBtn,'spinD','spin',this.playState,()=>{
             this.Accounts.decreaseBalnce(this.val)
                this.text.text=`$${this.Accounts.getBalance()}\nBalance`
                
                this.reels.playAnimation=true
                this.reels.spinning=true
                this.reels.buildBR();

                this.playBtn.children[0].eventMode='none'
            setTimeout(()=>{
                 this.reels.buildReel(false)
            this.reels.spinning=false
            //this.reels.playAnimation=false
            this.reels.bringDown=true   
            },1500)
                
            setTimeout(()=>{
                this.playState.value=true
                this.reels.spinning=false
                this.playBtn.changeTexture('spin')
                this.playBtn.children[0].eventMode='static'
                
            },2000)
        })

        this.transit.clickTransition(this.autoPlay,'autoSpinD','autoSpin',this.autoState,)
        this.transit.clickTransition(this.turbo,'turboD','turbo',this.turboState)
        

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
        this.stakeContainer.addChild(this.stake,this.incStake,this,this.decStake)
        this.addChild(this.stakeContainer)


        this.transit.clickTransition(this.incStake,'plus','plus',{value:true},()=>{
            if(this.val+20>=100||this.val>=100){
                this.incStake.changeTexture('plusD')
                //this.incState.value=false
             }
            if(this.val>=100)return
           
            this.val+=20
            this.stakeValue.text=`$${this.val}\n stake`
            this.stakeValue.size=this.stakeValue.size*0.6
            //this.deccState.value=true
            
            if(this.val>=20)this.decStake.changeTexture('minus')
        })


        this.transit.clickTransition(this.decStake,'minus','minus',{value:true},()=>{
            
             if(this.val-20<=0||this.val<=0){
                this.decStake.changeTexture('minusD')
                
            }
            if(this.val<=0)return
            
            this.val-=20
            this.stakeValue.text=`$${this.val}\n stake`
            
            if(this.val<=80)this.incStake.changeTexture('plus')

        })

        

    }

     public buildGame(bg:CreateBg){
        this.addChild(this.reelContainer)
        this.reelContainer.scale.set(0.5)

        this.reels.buildReels(this.reelContainer)

        this.reelContainer.addChild(this.reels)

        this.buildPlayPanelButton()
        this.buildAccountPanel()
        this.buildStakePanel()



        this.app.ticker.add(()=>{
            
            if(this.reels.playAnimation){
                
                this.reels.startAnimation()
            }
            if(this.reels.bringDown){
                this.reels.buildanimateDown()
                this.reels.checkWin()
            }
        })


    }

}


export default createGame