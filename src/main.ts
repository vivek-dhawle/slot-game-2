import BuildApp from '../utils/BuildApp.ts'
import createIntro from '../scene/CreateIntro.ts'
import createBg from'../scene/CreateBg.ts'
import createGame from '../scene/CreateGame.ts'

const Buildapp:any=new BuildApp()

const app=await Buildapp.createApp()


const bg:createBg=new createBg(app)
const intro:createIntro=new createIntro()
const game:createGame=new createGame(app)

bg.buildBg()


intro.buildIntro(bg,()=>{bg.addChild(game)})

game.buildGame(bg)
//bg.addChild(game)

app.stage.addChild(bg)