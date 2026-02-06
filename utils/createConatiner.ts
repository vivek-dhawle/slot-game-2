import {Container,Texture,Sprite} from 'pixi.js'
import AssetsLoader from './AssetLoader'
class createContainer extends Container{
    private sprite:Sprite|null
    private bounds:any
    constructor(texture?:string|null){
        super()
        this.sprite=null
        if (texture) {
            this.sprite=Sprite.from(texture)
            this.sprite.anchor.set(0.5);
            //this.sprite.scale.set(0.5)
            this.addChild(this.sprite)
        }
        
        
        this.bounds=this.getLocalBounds()
        this.pivot.set((this.bounds.minX+this.bounds.maxX)/2,(this.bounds.minY+this.bounds.maxY)/2)

    }

    public changeTexture(val:string){
        if(this.sprite)this.sprite.texture=AssetsLoader.getAsset(val)
    }

}

export default createContainer