import { CubeTexture, Group } from "@utils/aethree";
import { OutlinePass } from "@utils/aethree";
import { CON_BLOOM_LAYER, CON_DEFAULT_LAYER, CON_MODELS_URL } from "./auxiliaries/constants";
import { addLights, addOrbitHint, loadModel, loadSkybox } from "./auxiliaries/functions";
import { SolarSystem } from "./auxiliaries/types";
import { Planet } from "./classes/Planet";
import { SCENE, CAMERA, RENDERER, init, WINDOW_RESIZE, setWindowResize } from "./components/fundamentals";
import { setAnimation, setRender, startLoop } from "./components/animationLoop";
import { CAMERA_CONTROLLER, setUpCameraController } from "./components/cameraControls";
import { initLabelRenders, makeLabels, RENDERER2D, RENDERER3D } from "./components/labels";
import { BLOOM_COMPOSER, DARKEN_MATERIAL, DEFAULT_COMPOSER, hideFromBloom, initComposers, restoreMaterials } from "./components/postProcesses";
import { addStars } from "./components/stars";

/* 
    Please excuse the atrocities...

    HINDSIGHT - So, unlike the first part, I didn't really clean up this code.
    A lot of the learnings gained since working on this was applied in refactoring that first part,
    found here - https://github.com/akaecliptic/akaecliptic-alpha
    And truth be told, this is way more of a mess, and I don't feel like tackling it right now, but maybe in the future.

    It ain't pretty, and it ain't got heart.
*/

export var solarSystem: SolarSystem;
var skybox: CubeTexture = loadSkybox();

// Setting up core three components
init();
// Setting up post processing components
var oultiner: OutlinePass = initComposers();
// Adding all scene lights
addLights();
// Setting up label Renderer
initLabelRenders();
// Setting up camera controls
setUpCameraController(RENDERER3D);
// Load in stars
addStars();

// Load in solar system from assets
loadModel( CON_MODELS_URL, data => {
    solarSystem = Planet.createPlanetsFromGroup( data as Group );
    
    solarSystem[1].forEach( planet => {
        addOrbitHint( planet, solarSystem[0] );
        makeLabels( planet );
        planet.setOnClick( oultiner );
        planet.raw.layers.set( CON_DEFAULT_LAYER );
        SCENE.add( planet.raw );
    });
    
    solarSystem[0].layers.set( CON_BLOOM_LAYER );
    SCENE.add( solarSystem[0] );
});

// Starting main animation loop
startLoop();

// Setting callbacks
setAnimation( () => {
    CAMERA_CONTROLLER.update();
    
    if( solarSystem ){
        solarSystem[1].forEach( planet => {
            planet.updateOrbit();
            planet.updateRotation();
        });
    }
});

setRender( () => {
    RENDERER.render( SCENE, CAMERA );

    CAMERA.layers.enable( CON_BLOOM_LAYER );
    SCENE.traverse(hideFromBloom);
    SCENE.background = DARKEN_MATERIAL.color;
    
    BLOOM_COMPOSER.render();
    
    SCENE.traverse(restoreMaterials);
    SCENE.background = skybox;

    DEFAULT_COMPOSER.render();
    
    RENDERER2D.render( SCENE, CAMERA );
    RENDERER3D.render( SCENE, CAMERA );
});

setWindowResize( () => {
    CAMERA.aspect = ( window.innerWidth / window.innerHeight );
    CAMERA.updateProjectionMatrix();
    
    RENDERER.setSize( window.innerWidth, window.innerHeight );
    RENDERER2D.setSize( window.innerWidth, window.innerHeight );
    RENDERER3D.setSize( window.innerWidth, window.innerHeight );

    DEFAULT_COMPOSER.setSize( window.innerWidth, window.innerHeight );
    BLOOM_COMPOSER.setSize( window.innerWidth, window.innerHeight );
});

// Updating Window on resize
window.addEventListener( 'resize', WINDOW_RESIZE );
