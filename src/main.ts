import BuildApp from '../utils/intializer.ts'
import createIntro from '../scene/introScene.ts'
import createBg from'../scene/bgScene.ts'
//import introScene from '../scene/introScene.ts'
import createGame from '../scene/gameScene.ts'

const Buildapp:any=new BuildApp()

const app=await Buildapp.createApp()


const bg:createBg=new createBg(app)
const intro:createIntro=new createIntro(app)
const game:createGame=new createGame(app)

bg.buildBg()


//intro.buildIntro(bg,()=>{bg.addChild(game)})

game.buildGame(bg)
bg.addChild(game)

app.stage.addChild(bg)