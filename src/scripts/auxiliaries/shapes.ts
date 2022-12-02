import { Material, Object3D } from "@utils/aethree";

export interface IPlanet {
    name: string;
    angleMoved: number;
    orbitalDistance: number;
    orbitalSpeed: number;
    rotationSpeed: number;
    raw: Object3D;
}

export interface ILightColours {
    ambient: number;
    sun: number;
}

export interface IStarColours {
    least: number;
    mid: number;
    most: number;
}

export interface IShaderScripts {
    vertex: string;
    fragment: string;
}

export interface IMaterialStore {
    [key: string]: Material | Material[];
}
