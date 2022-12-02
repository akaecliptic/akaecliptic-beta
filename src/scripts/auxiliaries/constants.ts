import { ILightColours, IStarColours } from "./shapes";

export const CON_GRAVITATIONAL: number = .00005;
export const CON_STAR_COUNT: number = 15000;
export const CON_ROTATIONAL: number = .001;
export const CON_MODELS_URL: string = 'assets/models/planets.glb';
export const CON_SKYBOX_BASE_URL: string = 'assets/textures/';

export const CON_DEFAULT_LAYER = 0;
export const CON_BLOOM_LAYER = 1;

export const CON_LIGHT_COLOURS: ILightColours = { ambient: 0x333333, sun: 0xFFEE88 };
export const CON_STAR_COLOURS: IStarColours = { least: 0xAAFFFF, mid: 0xFFF066, most: 0xFFFFFF };
