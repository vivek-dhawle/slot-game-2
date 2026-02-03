import createContainer from "../utils/createConatiner";
import type CreateBg from "./bgScene";
import Transitions from '../utils/interaction.ts'
import { Container,Text,Graphics} from "pixi.js";
import Account from '../utils/accounts.ts'


class createReels extends Container{
    private maskConatiner:createContainer
    private masky:Graphics
    private slotContainer:createContainer
    private slot1:createContainer
    private slot2:createContainer
    private slot3:createContainer
    private slot4:createContainer
    private slot5:createContainer

    private arr1:createContainer[]
    private arr2:createContainer[]
    private arr3:createContainer[]
    private arr4:createContainer[]
    private arr5:createContainer[]
    private symbol:string[]
    private bSymbol:string[]
    public spinning:boolean=true

    private speed:number

    constructor(app:any){
        super()
        this. maskConatiner=new createContainer()
        this.masky=new Graphics()

        this.slotContainer=new createContainer()
        this.slot1=new createContainer()
        this.slot2=new createContainer()
        this.slot3=new createContainer()
        this.slot4=new createContainer()
        this.slot5=new createContainer()

        this.arr1=[]
        this.arr2=[]
        this.arr3=[]
        this.arr4=[]
        this.arr5=[]

        this.slotContainer.addChild(this.slot1,this.slot2,this.slot3,this.slot4,this.slot5)
        this.slot1.position.set(-630,0)
        this.slot2.position.set(-315,0)
        this.slot3.position.set(0,0)
        this.slot4.position.set(315,0)
        this.slot5.position.set(630,0)

        this.speed=100*app.ticker.deltaTime


        this.symbol=['a','b','c','d','e','f','g','h','minor','mini','major','s','w','y1','y2','y3']
        this.bSymbol=['a_blur','b_blur','c_blur','d_blur','e_blur','f_blur','g_blur','h_blur','minor_blur','mini_blur','major_blur','s_blur','w_blur']
    }

    private buildMask(frame:createContainer){
        this.masky.rect(0,0,frame.width,frame.height).fill(0xff000)

        this.masky.pivot.set(this.masky.width/2,this.masky.height/2)
        this.masky.scale.set(1.6,1.47)

        this.masky.position.set(0,-10)
       
       //this.maskConatiner.addChild(this.masky)
       
        this.addChild(this.masky)
        this.slotContainer.mask=this.masky

    }

    private createReel(container:createContainer,sprites:any,arr:any){
       for (let i = 0; i < 6; i++) {

            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new createContainer(sprites[index]);
            sprite.scale.set(0.9)
            sprite.y = (i * 310);
            container.addChild(sprite);
            arr.push(sprite)
        }
        container.pivot.set(0,(container.height/2)+15)

    }

    private buildBlurReel(container:createContainer,sprites:any,arr:any){
        if(!this.spinning)return
            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new createContainer(sprites[index]);
            //sprite.anchor.set(0.5);
            container.addChild(sprite); 
            sprite.position.set(0,-100)
            arr.push(sprite) 


        setTimeout(()=>{this.buildBlurReel(container,sprites,arr)
            },70)
    }

    buildReel(){
        this.createReel(this.slot1,this.symbol,this.arr1)
        this.createReel(this.slot2,this.symbol,this.arr2)
        this.createReel(this.slot3,this.symbol,this.arr3)
        this.createReel(this.slot4,this.symbol,this.arr4)
        this.createReel(this.slot5,this.symbol,this.arr5)
    }

    buildBR(){
        this.buildBlurReel(this.slot1,this.bSymbol,this.arr1)
        this.buildBlurReel(this.slot2,this.bSymbol,this.arr2)
        this.buildBlurReel(this.slot3,this.bSymbol,this.arr3)
        this.buildBlurReel(this.slot4,this.bSymbol,this.arr4)
        this.buildBlurReel(this.slot5,this.bSymbol,this.arr5)
    }

    private animateBlurReel(arr:any,speed:number){

            arr.forEach((ele:any)=>{
                if (ele.y>=this.masky.height+300){
                    ele.destroy();
                    arr.splice(0, 1);
                }
                ele.y+=speed;
            })
    }
    private buildTickerMove(){  
        this.animateBlurReel(this.arr1,this.speed)
        this.animateBlurReel(this.arr2,this.speed)
        this.animateBlurReel(this.arr3,this.speed)
        this.animateBlurReel(this.arr4,this.speed)
        this.animateBlurReel(this.arr5,this.speed)
    }


    playAnimation(){
        this.buildTickerMove()
    }

    public buildReels(frame:createContainer){
        this.addChild(this.slotContainer)
        this.buildMask(frame)
        this.buildReel()
        
        
    }
}

export default createReels