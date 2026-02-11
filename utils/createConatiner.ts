import {Container,Sprite,Texture} from 'pixi.js'

import { Assets } from 'pixi.js';
class createContainer extends Container{
    private sprite:Sprite|null
    private bounds:any
    constructor(texture?:string|null){
        super()
        this.sprite=null
        if (texture) {
           
            this.sprite=Sprite.from( Assets.get(texture))
            this.sprite.anchor.set(0.5);
            //this.sprite.scale.set(0.5)
            this.addChild(this.sprite)
        }
        
        
        this.bounds=this.getLocalBounds()
        this.pivot.set((this.bounds.minX+this.bounds.maxX)/2,(this.bounds.minY+this.bounds.maxY)/2)

    }

    public changeTexture(val:string){
        if(this.sprite)this.sprite.texture=Assets.get(val)
    }

}

export default createContainer