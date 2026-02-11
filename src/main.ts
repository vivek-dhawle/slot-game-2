import BuildApp from '../utils/BuildApp.ts'
import createIntro from '../scene/CreateIntro.ts'
import createBg from'../scene/CreateBg.ts'
import createGame from '../scene/CreateGame.ts'

import AssetsLoader from '../utils/AssetLoader.ts'


await AssetsLoader.loadBg()
await AssetsLoader.loadIntro()
await AssetsLoader.loadGame()

const Buildapp:BuildApp=new BuildApp()



const app=await Buildapp.createApp()


const bg:createBg=new createBg(app)
const intro:createIntro=new createIntro()
const game:createGame=new createGame(app)

bg.buildBg()


//intro.buildIntro(bg)
intro.playBtn.on('startPlay',()=>{
    game.buildGame()
    bg.addChild(game)
})

game.buildGame()
    bg.addChild(game)
app.stage.addChild(bg)