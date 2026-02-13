import {Application} from "pixi.js";


import type {ReelData} from "./ReelData"
import createContainer from "./CreateConatiner";

class Tween extends createContainer{
    
    private reels: ReelData[]=[]

    private tweening:any[]=[]
    public running=false

    private gap=310
    private symbol:string[]

    public app:Application
    private visibleRows = 3;
    public turbo:boolean=true


    public phaseFlag=false

    private winarr:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    private winLines = [
        // [1,6,11],
        // [1,7,11],
        // [1,7,12],
        // [1,6,11,16,21],
        // [1,7,12,18,23],
        // [1,7,11,17,21],
        // [1,7,12,7,1],
        // [1,7,11,7,21],
        // [2,6,12],[2,8,12],[2,7,12],
        // [2,6,11,18,23],
        // [2,8,13,16,21],
        // [2,7,12,17,22],
        // [2,6,12,18,22],
        // [2,8,12,16,22],
        // [2,6,12,18,22],
        // [2,8,12,16,22],
        // [3,7,13],
        // [3,7,11],
        // [3,7,8],
        // [3,8,13,18,23],
        // [3,7,12,16,21],
        // [3,7,12,7,3],
        // [3,7,13,17,23], 
        // [3,7,13,7,23],
        // [6,11,16],[11,16,21],
        // [7,12,17],[12,17,22],
        // [3,8,13],[8,13,18],[13,18,23],
        // [7,12,18],
        // [7,11,16],
        // [11,7,1],[13,7,3],
        // [1,7,6],[6,7,11],
        // [8,7,13],



        [0,1,2,3,4],
        [5,6,7],
        [5,6,7,8],
        [5,6,7,8,9],
        [5,6,7,8,14],
        [10,11,12,13,14],
        [0,6,11,8,4],
        [10,6,2,8,14],
        

       
    ];



    private resultMatrices:number [][][]=[
        [
            [1, 10, 10],
            [1, 10, 5],
            [10, 10, 8],
            [9, 10, 5],
            [1, 2, 10],
        ],[

            [1, 11, 10],
            [1, 11, 5],
            [10, 11, 8],
            [9, 11, 5],
            [1, 2, 11],

        ],[
            [1, 12, 12],
            [1, 12, 5],
            [10, 12, 8],
            [9, 12, 5],
            [1, 2, 12],
        ]
    ]

    private resultMatrix:number[][]


    private animateLine:any

    constructor(app:Application,symbol:string[],reels:ReelData[],tweening:any) {
        super()
        this.app = app
        this.symbol=symbol
        this.reels=reels
        this.tweening=tweening
    }

    public genWinArr(){
        for(let i=0;i<this.resultMatrix.length;i++){
            for(let j=0;j<this.resultMatrix[i].length;j++){
                this.winarr[i+j*5]=this.resultMatrix[i][j]
            }
        }
        console.log(this.winarr)
    }

    public tabResult(reelIndex: number){
        
        const reel = this.reels[reelIndex];
        const result = this.resultMatrix[reelIndex];
        for (let row = 0; row < this.visibleRows; row++) {
            const symbol = reel.symbols[row + 1];
            symbol.changeTexture( this.symbol[result[row]])
        }
    }

    public checkWin(){
        const arr=[]
        for(let j=0;j<this.winLines.length;j++){
            let win=true
            for(let i=0;i<this.winLines[j].length;i++){
                if(this.winarr[this.winLines[j][0]]!=this.winarr[this.winLines[j][i]]){
                    win=false
                    break
                }
            }
            if(win){
                arr.push(this.winLines[j])
                console.log(arr)
            }
        }

        if(arr.length>0){
            this.animateWin(0.6,arr,100)
            }
        }
        






    private setAlpha(val:number){
        this.reels[0].container.alpha=val
        this.reels[1].container.alpha=val
        this.reels[2].container.alpha=val
        this.reels[3].container.alpha=val
        this.reels[4].container.alpha=val
        
    }

    private setWinLine(winLines: number[], childAlpha: number, scale: number) {

    for (let i = 0; i < winLines.length; i++) {

        const position = winLines[i]

        const reelIndex = position % 5        // column
        const rowIndex = Math.floor(position / 5)+1  // row

        this.reels[reelIndex].symbols[rowIndex].alpha = childAlpha
        this.reels[reelIndex].symbols[rowIndex].scale.set(scale)
    }
}

    private animateWin(conAlpha:number,winLines:number[][],childAlpha:number){
        this.setAlpha(conAlpha)
        
        let time=0
        winLines.forEach((winLine:number[])=>{
            setTimeout(()=>{this.setWinLine(winLine,childAlpha,1.1)},time)
            time+=1500
            setTimeout(()=>{this.setWinLine(winLine,1,1)},time)
        })
        
        setTimeout(()=>{this.setAlpha(1)},time)

    }




    public addTicker(){

        this.app.ticker.add(()=>{
        for (let i=0;i<this.reels.length;i++){
           
            const ele=this.reels[i]
        
            //const phase=Math.min(1,(now-ele.start)/ele.time)
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
        this.resultMatrix=this.resultMatrices[Math.floor(Math.random()*this.resultMatrices.length)]
        if (this.running)return
        this.running=true
        this.emit('startSpin')
        for (let i=0;i<this.reels.length;i++) {
            const ele=this.reels[i]
            const target=ele.position+20+i*5
            const time=2000+i*600
            this.tweenTo(ele,target,this.turbo?time:2000,this.backout(0.5),i===this.reels.length - 1?()=>this.spinComplete():undefined)
        }
    }

    public spinComplete() {
        this.running=false
        this.genWinArr()
        this.checkWin()
        this.emit('changeBtn')
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