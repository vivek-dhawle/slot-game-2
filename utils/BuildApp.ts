import  * as PIXI from 'pixi.js'
import AssetsLoader from './AssetLoader'

class BuildApp {
    static app:PIXI.Application
    private loader:AssetsLoader

    constructor(){
        BuildApp.app=new PIXI.Application()
        this.loader=new AssetsLoader()
        
    }

    async createApp(){
        
        await BuildApp.app.init({
            resizeTo:window,
            background:0x1e1e1e
        })
        document.body.appendChild(BuildApp.app.canvas);
        await this.loader.LoadAssets()
        return BuildApp.app
    }

}
  export default BuildApp
