import createContainer from "../utils/CreateConatiner.ts";

import { Container,Graphics} from "pixi.js";



class CreateReels extends Container{
    
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


    mockData=[
                 [
    [4, 3, 0, 5, 6],
    [6, 9, 0, 13, 4],
    [1, 7, 0, 10, 4],
    [8, 2, 0, 11, 6],
    [5, 14, 0, 7, 3],
  ],

  // Pattern 2
  [
    [9, 4, 1, 6, 8,],
    [2, 7, 1, 12, 5],
    [6, 3, 1, 9, 14],
    [11, 8, 1, 4, 7],
    [13, 5, 1, 10, 2],
  ],

  // Pattern 3
  [
    [1, 6, 2, 4, 8],
    [7, 2, 2, 10, 3],
    [9, 11, 2, 6, 1],
    [0, 4, 2, 7, 10,],
    [6, 8, 2, 12, 4],
  ],

  // Pattern 4
  [
    [3, 5, 3, 9, 6],
    [10, 7, 3, 4, 12],
    [6, 1, 3, 11, 5,],
    [9, 8, 3, 6, 0],
    [2, 13, 3, 10, 7],
  ],

  // Pattern 5
  [
    [8, 4, 4, 6, 10],
    [5, 11, 4, 9, 2],
    [1, 6, 4, 12, 8],
    [13, 9, 4, 5, 11],
    [7, 2, 4, 10, 3,],
  ]



            ]



    winarr:any[]=[]
    winLines = [
        [1,6,11],
        [1,7,11],
        [1,7,12],
        [1,6,11,16,21],
        [1,7,12,18,23],
        [1,7,11,17,21],
        [1,7,12,7,1],
        [1,7,11,7,21],

        [2,6,12],[2,8,12],[2,7,12],
        [2,6,11,18,23],
        [2,8,13,16,21],
        [2,7,12,17,22],
        [2,6,12,18,22],
        [2,8,12,16,22],
        [2,6,12,18,22],
        [2,8,12,16,22],

        [3,7,13],
        [3,7,11],
        [3,7,8],
        [3,8,13,18,23],

        
        [3,7,12,16,21],
        

       
        
        [3,7,12,7,3],


        
        [3,7,13,17,23], 
        [3,7,13,7,23],
        
        [6,11,16],[11,16,21],
        [7,12,17],[12,17,22],
        [3,8,13],[8,13,18],[13,18,23],

       
        [7,12,18],
        [7,11,16],
        


        [11,7,1],[13,7,3],


        [1,7,6],[6,7,11],
        [8,7,13],
       
 ];

     speed:number
     speed1:number
     call:boolean=false
     bringDown=false

    app:any

    constructor(app:any){
        super()
       
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
        this.speed1=50


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
       for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new createContainer(sprites[index]);
            sprite.scale.set(0.9)
            sprite.y = (i * 310);

            container.addChild(sprite);
            arr.push(sprite)
            
        }
        container.pivot.set(0,(container.height/2)-140)
       

    }


    
    private createReel1(container:createContainer,sprites:any,arr:any,predfined:any){
       
        container.removeChildren();
    
        
       for (let i = 0; i < 5; i++) {
            const sprite = new createContainer(sprites[predfined[i]]);
            sprite.scale.set(0.9)
           
                sprite.y=((i* 320))
            
            container.addChild(sprite);
            arr.push(sprite)
            this.winarr.push(predfined[i])
        }
        container.pivot.set(0,(container.height/2)-140)
       

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
            const i=Math.floor(Math.random()*this.mockData.length)
            const ans=this.mockData[i]
        
            this.winarr.length=0

            this.createReel1(this.slot1,this.symbol,this.arr1,ans[0])
            this.createReel1(this.slot2,this.symbol,this.arr2,ans[1])
            this.createReel1(this.slot3,this.symbol,this.arr3,ans[2])
            this.createReel1(this.slot4,this.symbol,this.arr4,ans[3])
            this.createReel1(this.slot5,this.symbol,this.arr5,ans[4])
            
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
        // if(arr.length==0){

        //     this.buildReel(false)
        //     this.spinning=false
        //     this.playAnimation=false
        //     this.bringDown=true        
        // }else{
            arr.forEach((ele:any)=>{
                //('dgdgegergegege',ele.y)
                ele.y+=speed;
                if (ele&&ele.y>=this.masky.height+400){
                    ele.destroy();
                    arr.splice(arr.indexOf(ele), 1);
                }
                
            })
        // }
    }

    private animateReel(arr:any,speed:number){
            
            arr.forEach((ele:any)=>{
                //('dgdgegergegege',ele.y)
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
                if (ele&&ele.y>=(100)){
                     this.playAnimation=false
                    // this.call=false
                    // this.spinning=false
                    this.bringDown=false
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

    checkWin(){
        (this.winarr)
        const arr=[]

        for(let j=0;j<this.winLines.length;j++){
            let win=true
            for(let i=0;i<this.winLines[j].length;i++){
                if(this.winarr[this.winLines[j][0]]!=this.winarr[this.winLines[j][i]]){
                    (this.winLines[j][i],this.winarr[this.winLines[j][i]])
                    win=false
                    
                    break
                }
            
            }
            if(win){
                
                arr.push(this.winLines[j])
            }
        }
        if(arr.length>0){
        this.animateWin(0.6,arr,100)}
        //this.animateWin(1)
        //(this.winarr)

    }

    setAlpha(val:any){
        this.slot1.alpha=val
        this.slot2.alpha=val
        this.slot3.alpha=val
        this.slot4.alpha=val
        this.slot5.alpha=val

    }

    setWinLine(winLines:any,childAlpha:any,scale:any){
        for(let i=0;i<winLines.length;i++){
            let index=winLines[i]%5
            if(winLines[i]<=4){
                //(i)
                this.slot1.children[index].alpha=childAlpha
                this.slot1.children[index].scale.set(scale)
            }
            if(winLines[i]>4&&winLines[i]<=9){
                //(i)
                this.slot2.children[index].alpha=childAlpha
                this.slot2.children[index].scale.set(scale)
            }
            if(winLines[i]>9&&winLines[i]<=14){
                //(i)
                this.slot3.children[index].alpha=childAlpha
                this.slot3.children[index].scale.set(scale)
            }
            if(winLines[i]>14&&winLines[i]<=19){
                //(i)
                this.slot4.children[index].alpha=childAlpha
                this.slot4.children[index].scale.set(scale)
            }
            if(winLines[i]>19&&winLines[i]<=24){
                //(i)
                this.slot5.children[index].alpha=childAlpha
                this.slot5.children[index].scale.set(scale)
            }
        }
    }

    animateWin(conAlpha:any,winLines:any,childAlpha:any){
        this.setAlpha(conAlpha)
        
        let time=0
        winLines.forEach((winLine:any)=>{
            setTimeout(()=>{this.setWinLine(winLine,childAlpha,1.3)},time)
            time+=1500
            setTimeout(()=>{this.setWinLine(winLine,1,1)},time)
        })
        
        setTimeout(()=>{this.setAlpha(1)},time)

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

export default CreateReels