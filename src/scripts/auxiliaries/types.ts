import { Group, Object3D, Renderer } from "@utils/aethree";
import { GLTF } from "@utils/aethree";
import { CSS3DRenderer } from "@utils/aethree";
import { Planet } from "../classes/Planet";

export type Processor = ( data: GLTF | Group ) => void;
export type Updater = ( value?: any ) => any;
export type Renderers = Renderer | CSS3DRenderer;
export type WindowResizeCallback = ( ) => any;
export type LoopAnimator = ( ) => void;
export type LoopRender = ( ) => void;

export type Sun = Object3D;
export type PlanetName = 'Profile' | 'TODO_1' | 'TODO_2' | 'Personal' | 'About' ;
export type PlanetNameLocal = 'Hasari' | 'Omiri' | 'Rafeki' | 'Teferi Kosi' | 'Inari Kosi' ;
export type NameDisplayOptions = 0 | 1 | 2 ;
export type SolarSystem = [ Sun, Planet[] ];
