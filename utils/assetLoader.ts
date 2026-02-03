import {Assets,Texture} from 'pixi.js'

class AssetsLoader{
    static Asset:Record<string,Texture>
    async LoadAssets(){
        AssetsLoader.Asset = await Assets.load([
            {alias:'frame1',src:'../sourceAssets/introScreen/assets/frame1.png'},
            {alias:'frame2',src:'../sourceAssets/introScreen/assets/frame2.png'},
            {alias:'bg',src:'../sourceAssets/backgrounds/assets/bg.png'},
            {alias:'lBtn',src:'../sourceAssets/introScreen/assets/ptLeftArrowBtn.png'},
            {alias:'rBtn',src:'../sourceAssets/introScreen/assets/ptRightArrowBtn.png'},
            {alias:'pNBtn',src:'../sourceAssets/introScreen/assets/prePlayBtn_normal.png'},
            {alias:'pDBtn',src:'../sourceAssets/introScreen/assets/prePlayBtn_down.png'},
            {alias:'pHBtn',src:'../sourceAssets/introScreen/assets/prePlayBtn_hover.png'},
            {alias:'logo',src:'../sourceAssets/gameLogo/assets/gameLogo.png'},
            {alias:'bFrame',src:'../sourceAssets/introScreen/assets/pagerBase.png'},
            {alias:'aFrame',src:'../sourceAssets/introScreen/assets/pagerMaker.png'},
            {alias:'reelFrame',src:'../sourceAssets/reelFrame/assets/reelframe.png'},

            {alias:'spin',src:'../sourceAssets/gamePanel/newPanel/assets/spineBtn_main_normal.png'},
            {alias:'spinH',src:'../sourceAssets/gamePanel/newPanel/assets/spineBtn_main_hover.png'},
            {alias:'spinD',src:'../sourceAssets/gamePanel/newPanel/assets/spineBtn_main_disabled.png'},

            {alias:'autoSpin',src:'../sourceAssets/gamePanel/newPanel/assets/menu_autospin_normal.png'},
            {alias:'autoSpinH',src:'../sourceAssets/gamePanel/newPanel/assets/menu_autospin_hover.png'},
            {alias:'autoSpinD',src:'../sourceAssets/gamePanel/newPanel/assets/menu_autospin_down.png'},


            {alias:'turbo',src:'../sourceAssets/gamePanel/newPanel/assets/menu_quickSpin_normal.png'},
            {alias:'turboH',src:'../sourceAssets/gamePanel/newPanel/assets/menu_quickSpin_hover.png'},
            {alias:'turboD',src:'../sourceAssets/gamePanel/newPanel/assets/menu_quickSpin_down.png'},

            {alias:'plus',src:'../sourceAssets/gamePanel/newPanel/assets/plusIcon_normal.png'},
            {alias:'plusH',src:'../sourceAssets/gamePanel/newPanel/assets/plusIcon_hover.png'},
            {alias:'plusD',src:'../sourceAssets/gamePanel/newPanel/assets/plusIcon_disabled.png'},


            {alias:'minus',src:'../sourceAssets/gamePanel/newPanel/assets/minusIcon_normal.png'},
            {alias:'minusH',src:'../sourceAssets/gamePanel/newPanel/assets/minusIcon_hover.png'},
            {alias:'minusD',src:'../sourceAssets/gamePanel/newPanel/assets/minusIcon_disabled.png'},



            {alias:'a',src:'../sourceAssets/symbols/assets/a.png'},
            {alias:'b',src:'../sourceAssets/symbols/assets/b.png'},
            {alias:'c',src:'../sourceAssets/symbols/assets/c.png'},
            {alias:'d',src:'../sourceAssets/symbols/assets/d.png'},
            {alias:'e',src:'../sourceAssets/symbols/assets/e.png'},
            {alias:'f',src:'../sourceAssets/symbols/assets/f.png'},
            {alias:'g',src:'../sourceAssets/symbols/assets/g.png'},
            {alias:'h',src:'../sourceAssets/symbols/assets/h.png'},
            {alias:'minor',src:'../sourceAssets/symbols/assets/minor.png'},
            {alias:'mini',src:'../sourceAssets/symbols/assets/mini.png'},
            {alias:'major',src:'../sourceAssets/symbols/assets/major.png'},
            {alias:'s',src:'../sourceAssets/symbols/assets/s.png'},
            {alias:'w',src:'../sourceAssets/symbols/assets/w.png'},
            {alias:'y1',src:'../sourceAssets/symbols/assets/y1.png'},
            {alias:'y2',src:'../sourceAssets/symbols/assets/y2.png'},
            {alias:'y3',src:'../sourceAssets/symbols/assets/y3.png'},


            {alias:'a_blur',src:'../sourceAssets/symbols/assets/a_blur.png'},
            {alias:'b_blur',src:'../sourceAssets/symbols/assets/b_blur.png'},
            {alias:'c_blur',src:'../sourceAssets/symbols/assets/c_blur.png'},
            {alias:'d_blur',src:'../sourceAssets/symbols/assets/d_blur.png'},
            {alias:'e_blur',src:'../sourceAssets/symbols/assets/e_blur.png'},
            {alias:'f_blur',src:'../sourceAssets/symbols/assets/f_blur.png'},
            {alias:'g_blur',src:'../sourceAssets/symbols/assets/g_blur.png'},
            {alias:'h_blur',src:'../sourceAssets/symbols/assets/h_blur.png'},
            {alias:'minor_blur',src:'../sourceAssets/symbols/assets/minor_blur.png'},
            {alias:'mini_blur',src:'../sourceAssets/symbols/assets/mini_blur.png'},
            {alias:'major_blur',src:'../sourceAssets/symbols/assets/major_blur.png'},
            {alias:'s_blur',src:'../sourceAssets/symbols/assets/s_blur.png'},
            {alias:'w_blur',src:'../sourceAssets/symbols/assets/w_blur.png'},


            

        ]) 
        console.log(AssetsLoader.Asset)
    }
    static getAsset(val:string):Texture{
        console.log(AssetsLoader.Asset[val])
        return AssetsLoader.Asset[val]
    }

}

export default AssetsLoader