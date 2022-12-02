import { Layers, Mesh, MeshBasicMaterial, Object3D, ShaderMaterial, Vector2 } from "@utils/aethree";
import { EffectComposer } from "@utils/aethree";
import { RenderPass } from "@utils/aethree";
import { OutlinePass } from "@utils/aethree";
import { ShaderPass } from "@utils/aethree";
import { UnrealBloomPass } from "@utils/aethree";
import { CON_BLOOM_LAYER } from "../auxiliaries/constants";
import { CAMERA, RENDERER, SCENE } from "./fundamentals";
import { IMaterialStore, IShaderScripts } from "../auxiliaries/shapes";

export const DARKEN_MATERIAL: MeshBasicMaterial = new MeshBasicMaterial( { color: 'black' } );
export let DEFAULT_COMPOSER: EffectComposer;
export let BLOOM_COMPOSER: EffectComposer;

const resolution: Vector2 = new Vector2( window.innerWidth, window.innerHeight );
const bloomLayer: Layers = new Layers( );
const materialStore: IMaterialStore = { };
const shaderScripts: IShaderScripts = { 
    vertex: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragment: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        
        varying vec2 vUv;
        
        void main() {
            gl_FragColor = ( texture2D( baseTexture, vUv ) + texture2D( bloomTexture, vUv ) );
        }
    `
};

export const initComposers = (): OutlinePass =>{
    DEFAULT_COMPOSER = new EffectComposer( RENDERER );
    BLOOM_COMPOSER = new EffectComposer( RENDERER );

    const renderPass: RenderPass = new RenderPass( SCENE, CAMERA );
    const outlinePass: OutlinePass = new OutlinePass( resolution, SCENE, CAMERA );
    const unrealBloomPass: UnrealBloomPass = new UnrealBloomPass( resolution, 1.2, 1, 0 );
    const finalPass: ShaderPass = new ShaderPass(
        new ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: BLOOM_COMPOSER.renderTarget2.texture }
            },
            vertexShader: shaderScripts.vertex,
            fragmentShader: shaderScripts.fragment,
            depthTest: false,
            defines: {}
        } ), 
        'baseTexture'
    );
    finalPass.needsSwap = true;
    
    DEFAULT_COMPOSER.addPass( renderPass );
    DEFAULT_COMPOSER.addPass( outlinePass );
    DEFAULT_COMPOSER.addPass( finalPass );
    
    BLOOM_COMPOSER.addPass( renderPass );
    BLOOM_COMPOSER.addPass( unrealBloomPass );
    
    BLOOM_COMPOSER.renderToScreen = false;

    return outlinePass;
};

export const hideFromBloom = ( mesh: Object3D ): void => {
    if ( ( <Mesh>mesh ).isMesh && bloomLayer.test( mesh.layers ) === false ) {
        materialStore[ mesh.uuid ] = ( <Mesh>mesh ).material;
        ( <Mesh>mesh ).material = DARKEN_MATERIAL;
    }
};

export const restoreMaterials = ( mesh: Object3D ): void => {
    if ( materialStore[ mesh.uuid ] ) {
        ( <Mesh>mesh ).material = materialStore[ mesh.uuid ];
        delete materialStore[ mesh.uuid ];
    }
};

bloomLayer.set( CON_BLOOM_LAYER );
