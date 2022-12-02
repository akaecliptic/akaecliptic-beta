import { AmbientLight, BufferGeometry, CubeTexture, CubeTextureLoader, EllipseCurve, Line, LineBasicMaterial, PointLight, Vector2 } from "@utils/aethree";
import { GLTFLoader } from "@utils/aethree"
import { Planet } from "../classes/Planet";
import { SCENE } from "../components/fundamentals";
import { solarSystem } from "../app";
import { CON_LIGHT_COLOURS, CON_SKYBOX_BASE_URL } from "./constants";
import { NameDisplayOptions, Processor, Sun } from "./types";

export const getRandomInt = (max: number): number => {
    return Math.floor( Math.random() * max );
}

export const getRandomBias = (min: number, max: number, bias: number, influence: number): number => {
    const rand = Math.random() * (max - min) + min; // random in range
    const mix = Math.random() * influence; // random mixer
    return rand * ( 1 - mix ) + bias * mix; // mix full range and bias
}

export const loadModel = (url: string, processor: Processor, fromRoot?: boolean): void => {
    const loader: GLTFLoader = new GLTFLoader();
    loader.load( url, data => {
        if(fromRoot == true){
            processor( data );
        }else{
            processor( data.scene );
        }
    });
};

export const loadSkybox = (): CubeTexture => {
    return new CubeTextureLoader()
                .setPath(CON_SKYBOX_BASE_URL)
                .load([
                    'Right.png',
                    'Left.png',
                    'Top.png',
                    'Bottom.png',
                    'Front.png',
                    'Back.png',
                ]);
};

export const addLights = (): void => {
    const pointLight: PointLight = new PointLight( CON_LIGHT_COLOURS.sun, 7, 1000, 1);
    const ambientLight: AmbientLight = new AmbientLight( CON_LIGHT_COLOURS.ambient );

    SCENE.add( pointLight );
    SCENE.add( ambientLight );
};

export const addOrbitHint = ( planet: Planet, sun: Sun ): void => {

    const curve: EllipseCurve = new EllipseCurve(
        0,  0,                                           // ax, aY
        planet.orbitalDistance, planet.orbitalDistance,  // xRadius, yRadius
        0,  2 * Math.PI,                                 // aStartAngle, aEndAngle
        false, 0                                         // aClockwise, aRotation
    );
    
    const points: Vector2[] = curve.getPoints( 64 );
    const geometry: BufferGeometry = new BufferGeometry().setFromPoints( points );
    const material: LineBasicMaterial = new LineBasicMaterial( { color: 'white' } );

    material.transparent = true;
    material.opacity = .1;

    sun.add( new Line( geometry, material ).rotateX( 90 * ( Math.PI / 180 ) ) );
};

export const updatePlanetLabels = ( type: NameDisplayOptions ): void => {
    solarSystem[1].forEach( planet => {
        planet.updateLabel( type );
    });
};
