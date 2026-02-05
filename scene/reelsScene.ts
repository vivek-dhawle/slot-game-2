import createContainer from "../utils/createConatiner";
import type CreateBg from "./bgScene";
import Transitions from '../utils/interaction.ts'
import { Container,Text,Graphics} from "pixi.js";
import Account from '../utils/accounts.ts'


class createReels extends Container{
    private maskConatiner:createContainer
    private masky:Graphics
    private slotContainer:Container
    slot1:createContainer
    private slot2:createContainer
    private slot3:createContainer
    private slot4:createContainer
    private slot5:createContainer

    private arr1:createContainer[]
    private arr2:createContainer[]
    private arr3:createContainer[]
    private arr4:createContainer[]
    private arr5:createContainer[]

     private barr1:createContainer[]
    private barr2:createContainer[]
    private barr3:createContainer[]
    private barr4:createContainer[]
    private barr5:createContainer[]

    private symbol:string[]
    private bSymbol:string[]
    public spinning:boolean=false
    playAnimation:boolean=false

     speed:number
     speed1:number
     call:boolean=false
     bringDown=false

    app:any

    constructor(app:any){
        super()
        this. maskConatiner=new createContainer()
        this.masky=new Graphics()

        this.slotContainer=new Container()
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

         this.barr1=[]
        this.barr2=[]
        this.barr3=[]
        this.barr4=[]
        this.barr5=[]

        this.slotContainer.addChild(this.slot1,this.slot2,this.slot3,this.slot4,this.slot5)
        this.slot1.position.set(-630,0)
        this.slot2.position.set(-315,0)
        this.slot3.position.set(0,0)
        this.slot4.position.set(315,0)
        this.slot5.position.set(630,0)

        this.speed=90
        this.speed1=20


        this.symbol=['a','b','c','d','e','f','g','h','minor','mini','major','s','w','y1','y2','y3']
        this.bSymbol=['a_blur','b_blur','c_blur','d_blur','e_blur','f_blur','g_blur','h_blur','minor_blur','mini_blur','major_blur','s_blur','w_blur']

        this.app=app
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
        
        container.removeChildren();
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


    
    private createReel1(container:createContainer,sprites:any,arr:any,predfined:any){
       
        container.removeChildren();
    
        
       for (let i = 0; i < 6; i++) {
            const sprite = new createContainer(sprites[predfined[i]]);
            sprite.scale.set(0.9)
           
                sprite.y=(-500+(i* 310))
            
            container.addChild(sprite);
            arr.push(sprite)
        }
        container.pivot.set(0,(container.height/2)+15)
       

    }



    private buildBlurReel(container:createContainer,sprites:any,arr:any){
        if(!this.spinning)return
        const index = Math.floor(Math.random()*sprites.length);
        const sprite = new createContainer(sprites[index]);
        //sprite.children[0].anchor.set(0.5);
        container.addChild(sprite); 
        sprite.position.set(0,100)
        arr.push(sprite)             
        if(this.spinning)setTimeout(()=>{this.buildBlurReel(container,sprites,arr)
            },60)
    }

    buildReel(flag:any=true){
        if (flag) {
            this.createReel(this.slot1,this.symbol,this.arr1)
            this.createReel(this.slot2,this.symbol,this.arr2)
            this.createReel(this.slot3,this.symbol,this.arr3)
            this.createReel(this.slot4,this.symbol,this.arr4)
            this.createReel(this.slot5,this.symbol,this.arr5)
        } else {
            this.createReel1(this.slot1,this.symbol,this.arr1,[1,2,3,8,5,6])
            this.createReel1(this.slot2,this.symbol,this.arr2,[1,2,3,4,5,6])
            this.createReel1(this.slot3,this.symbol,this.arr3,[1,2,3,4,5,6])
            this.createReel1(this.slot4,this.symbol,this.arr4,[1,2,3,4,5,6])
            this.createReel1(this.slot5,this.symbol,this.arr5,[1,2,3,4,5,6])
            
        }


        
    }

    buildBR(){
        this.buildBlurReel(this.slot1,this.bSymbol,this.barr1)
        this.buildBlurReel(this.slot2,this.bSymbol,this.barr2)
        this.buildBlurReel(this.slot3,this.bSymbol,this.barr3)
        this.buildBlurReel(this.slot4,this.bSymbol,this.barr4)
        this.buildBlurReel(this.slot5,this.bSymbol,this.barr5)
    }

    private animateBlurReel(arr:any,speed:number){
        if(arr.length==0){

            this.buildReel(false)
            this.spinning=false
            this.playAnimation=false
            this.bringDown=true        
        }else{
            arr.forEach((ele:any)=>{
                //console.log('dgdgegergegege',ele.y)
                ele.y+=speed;
                if (ele&&ele.y>=this.masky.height+400){
                    ele.destroy();
                    arr.splice(arr.indexOf(ele), 1);
                }
                
            })
        }
    }

    private animateReel(arr:any,speed:number){
            
            arr.forEach((ele:any)=>{
                //console.log('dgdgegergegege',ele.y)
                ele.y+=speed;
                if (ele&&ele.y>=this.masky.height+400){
                    ele.destroy();
                    
                    arr.splice(arr.indexOf(ele), 1);
                }
                
            })
    }

   animateDown(arr:any,speed:number){
        for(let ele of arr){
                ele.y+=speed;
                if (ele&&ele.y>=this.masky.height+910){
                    // this.playAnimation=false
                    // this.call=false
                    // this.spinning=false
                    
                   break
                }
            }
        
   }

   buildanimateDown(){
       this.animateDown(this.arr2,this.speed1)
       this.animateDown(this.arr3,this.speed1)
       this.animateDown(this.arr4,this.speed1)
       this.animateDown(this.arr5,this.speed1)
       this.animateDown(this.arr1,this.speed1)
       
   }


    private buildTickerMove(){  
        this.animateBlurReel(this.barr1,this.speed)
        this.animateBlurReel(this.barr2,this.speed)
        this.animateBlurReel(this.barr3,this.speed)
        this.animateBlurReel(this.barr4,this.speed)
        this.animateBlurReel(this.barr5,this.speed)
    }


    private buildTickerRMove(){
        if(!this.spinning)return 
        this.animateReel(this.arr1,this.speed)
        this.animateReel(this.arr2,this.speed)
        this.animateReel(this.arr3,this.speed)
        this.animateReel(this.arr4,this.speed)
        this.animateReel(this.arr5,this.speed)
    }


    startAnimation(){
        this.buildTickerRMove()
        if(this.arr1.length<=3||this.playAnimation)this.buildTickerMove()
        //if(this.playAnimation&&this.call)this.buildanimateDown()
        
    }

    public buildReels(frame:createContainer){
        this.addChild(this.slotContainer)
        this.buildMask(frame)
        this.buildReel()
        
    }
}

export default createReels