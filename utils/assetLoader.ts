import {Assets} from 'pixi.js'

class AssetsLoader{
  static async init(){
    await Assets.init({
      manifest:'./src/manifest.json', 
    });
  }
  static async loadBg(){
    await this.init()
    await Assets.loadBundle('backgrounds');
  }
  static async loadIntro() {
    await Assets.loadBundle(['introScreen','gameLogo']);
  }

  static async loadGame() {

    await Assets.loadBundle(['symbols','reelFrame','gamePanel']);
  }

 
}

export default AssetsLoader;
