import AssetLoader from '../utils/assetLoader.ts'
import createContainer from './createConatiner.ts'
import {Texture} from 'pixi.js'
class Transitions{

    hoverTransition(element:createContainer,truetransitSprite:string,truebaseSprite:string,falsetransitSprite?:string|null,falsebaseSprite?:string|null,mode?:any,cb?:Function|null){


        
        element.children[0].eventMode='static'
        element.children[0].cursor='pointer'
        let texture:string

        element.children[0].on('pointerover', () => {

            if (mode&&falsetransitSprite){
                 texture=mode.value?truetransitSprite:falsetransitSprite;
            } else {
                //console.log('dfgbgbsdfvf',mode,falsetransitSprite)
                texture=truetransitSprite;
            }

            element.changeTexture(texture)
            if(cb)cb()
        });

        element.children[0].on('pointerout', () => {
            if (mode&&falsebaseSprite){
                texture=mode.value?truebaseSprite:falsebaseSprite;

            } else {
                texture=truebaseSprite;
            }
            element.changeTexture(texture)
            if(cb)cb()
        });
    }

    clickTransition(element:createContainer,falseMode:string,trueMode:string,mode?:any,cb?:Function|null){
        element.children[0].eventMode='static'
        element.children[0].cursor='pointer'
        let texture:string
        element.children[0].on('mousedown',(e)=>{
            if(mode.value){
                texture=falseMode
            }
            else{
                texture=trueMode
            }
            element.changeTexture(texture)
            console.log(mode)
            mode.value=!mode.value
            if(cb)cb()
            
        })
    }



}

export default Transitions