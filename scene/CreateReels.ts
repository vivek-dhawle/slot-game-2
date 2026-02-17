import createContainer from "../utils/CreateConatiner";
import {Application,Container,Graphics,BlurFilter} from "pixi.js";
import Tween from "../utils/Tween"
import type { ReelData } from "../utils/ReelData";
import "@esotericsoftware/spine-pixi-v8";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import delay from  "../utils/asyncHandler"

class CreateReels extends Container {
    private masky:Graphics
    private slotContainer:Container
    private slotArr:createContainer[]
     private win:any
    public Tween:Tween
    private reels: ReelData[]=[]

    private tweening:any[]=[]
    private gap=310
    private symbol:string[]

    public app:Application
    private slot1:createContainer
    private slot2:createContainer
    private slot3:createContainer
    private slot4:createContainer
    private slot5:createContainer

    constructor(app:Application) {
        super()

        this.app = app
        
        this.masky = new Graphics()
        this.slotContainer = new Container()

        this.slot1=new createContainer()
        this.slot2=new createContainer()
        this.slot3=new createContainer()
        this.slot4=new createContainer()
        this.slot5=new createContainer()

        this.slotArr=[this.slot1,this.slot2,this.slot3,this.slot4,this.slot5]

        this.slotContainer.addChild(this.slot1,this.slot2,this.slot3,this.slot4,this.slot5)

        this.slot1.position.set(-630,0)
        this.slot2.position.set(-315,0)
        this.slot3.position.set(0,0)
        this.slot4.position.set(315,0)
        this.slot5.position.set(630,0)

        this.symbol=['a.png','b.png','c.png','d.png','e.png','f.png','g.png','h.png','minor.png','mini.png','major.png','s.png','w.png','y1.png','y2.png','y3.png']

        this.Tween=new Tween(app,this.symbol,this.reels,this.tweening)

         this.win=Spine.from({
            skeleton: "commendations.json",
            atlas: "commendations.atlas"
      })
      

        this.Tween.on('mega',()=>{
            this.commodation('Mega_win_in','Mega_win_loop','Mega_win_out')

        })
        this.Tween.on('ultra',()=>{
             this.commodation('Ultra_win_in','Ultra_win_loop','Ultra_win_out')
           
           
            
        })
        this.Tween.on('big',()=>{
             this.commodation('Big_win_in','Big_win_loop','Big_win_out')
        })
        window.addEventListener('click',()=>{
           
        this.removeChild(this.win)
       })

    }
    public buildReels(frame:createContainer) {
        this.addChild(this.slotContainer)
        this.createReels()
        this.buildMask(frame)
        this.Tween.addTicker()
    }


    public async  commodation(commoin:string,commoloop:string,commoout:string){
         this.addChild(this.win)
            this.win.state.setAnimation(0,commoin,false)
            await delay(1000)
            this.win.state.setAnimation(0,commoloop,true)
            await delay(3000)
            this.win.state.setAnimation(0,commoout,false)
            //await delay(400)
            this.removeChild(this.win)
            

    }
    
    private buildMask(frame:createContainer){
        this.masky.rect(0,0,frame.width,frame.height-15).fill(0x000000)

        this.masky.pivot.set(this.masky.width/2,this.masky.height/2+5)

        this.masky.scale.set(1.6, 1.47)

        this.addChild(this.masky)
        this.slotContainer.mask = this.masky
    }

    private createReels() {
        for (let j=0;j<5;j++) {
            
            const blur=new BlurFilter()
            //this.slotArr[j].filters=[blur]
            const reel:ReelData={
                container:this.slotArr[j],
                symbols:[],
                position:0,
                previousPosition:0,
                blur,
            }
            for (let i=0;i<5;i++) {
                const index=Math.floor(Math.random()*this.symbol.length)

                const sprite=new createContainer(this.symbol[index])
                sprite.scale.set(0.9)
                sprite.y=i*this.gap

                this.slotArr[j].addChild(sprite)
                reel.symbols.push(sprite)
            }

            this.slotArr[j].pivot.set(0,this.slotArr[j].height/2-140)
            this.reels.push(reel)
        }
    }

}

export default CreateReels;