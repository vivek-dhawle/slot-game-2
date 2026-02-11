import {Application} from "pixi.js";


import type {ReelData} from "./ReelData"

class Tween{
    
    private reels: ReelData[]=[]

    private tweening:any[]=[]
    public running=false

    private gap=310
    private symbol:string[]

    public app:Application
    private visibleRows = 3;

    private resultMatrix: number[][] = [
        [1, 10, 10],
        [1, 10, 5],
        [10, 10, 8],
        [9, 10, 5],
        [1, 2, 10],
    ]
    
    private payLines:number[][]=[
        [0,0,0,0,0],
        [1,1,1,1,1],
        [2,2,2,2,2],
        [0,1,2,1,0],
        [2,1,0,1,2],
        
    ]

    constructor(app:Application,symbol:string[],reels:ReelData[],tweening:any) {
        this.app = app
        this.symbol=symbol
        this.reels=reels
        this.tweening=tweening
    }

    public tabResult(reelIndex: number){
        const reel = this.reels[reelIndex];
        const result = this.resultMatrix[reelIndex];

        for (let row = 0; row < this.visibleRows; row++) {
            const symbol = reel.symbols[row + 1];
            symbol.changeTexture( this.symbol[result[row]])
        }
    }

    public addTicker(){

        this.app.ticker.add(()=>{
        for (let i=0;i<this.reels.length;i++){
            const ele=this.reels[i]
            ele.previousPosition=ele.position
            for (let j=0;j<ele.symbols.length;j++) {
                const s=ele.symbols[j]
                

                s.y=((ele.position+j)%5)*this.gap

                if (s.y>0&&s.y>(this.gap*4+100)){
                    // const index=Math.floor(Math.random()*this.symbol.length)
                    // console.log(index)
                    // s.changeTexture(this.symbol[index])
                    this.tabResult(i)

                }
            }
        }
        this.updateTween()
        });
    }

    public startSpin() {
        if (this.running)return
        this.running=true
        for (let i=0;i<this.reels.length;i++) {
            const ele=this.reels[i]
            const target=ele.position+20+i*5
            const time=2000+i*600
            this.tweenTo(ele,target,time,this.backout(0.5),i===this.reels.length - 1?()=>this.spinComplete():undefined)
        }
    }

    public spinComplete() {
        this.running=false

    }

    public tweenTo(object:any,target:number,time:number,easing:any,oncomplete?:Function){
        const tween={
            object,
            propertyBeginValue: object['position'],
            target,
            easing,
            time,
            complete: oncomplete,
            start: Date.now(),
        };
        this.tweening.push(tween);
    }

    public updateTween() {
        const now=Date.now();
        const remove=[];
        for (let i=0;i<this.tweening.length;i++) {
            const t=this.tweening[i];
            const phase=Math.min(1,(now-t.start)/t.time)

            const eased=t.easing(phase);
            
        t.object['position']=t.propertyBeginValue*(1 - eased)+t.target*eased;
            if (phase===1) {
                t.object[t.property]=t.target
                if (t.complete)t.complete()
                remove.push(t)
            }
        }

        for (let i = 0; i < remove.length; i++) {
            this.tweening.splice(this.tweening.indexOf(remove[i]),1)
        }
    }

    public backout(amount: number) {
        return (t: number) =>--t * t * ((amount + 1) * t + amount) + 1
    }

}

export default Tween