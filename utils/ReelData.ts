import createContainer from "../utils/CreateConatiner";
import {Application,Container,BlurFilter} from "pixi.js";

export interface ReelData {
  container: Container;
  symbols: createContainer[];
  position: number;
  previousPosition: number;
  blur: BlurFilter;
}

