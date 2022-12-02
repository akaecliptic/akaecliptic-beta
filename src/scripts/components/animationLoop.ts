import { LoopAnimator, LoopRender } from "../auxiliaries/types";
import { CAMERA, RENDERER, SCENE } from "./fundamentals";

var DELTATIME: number;
var lastTime: number;
var render: LoopRender;
var animation: LoopAnimator;

export const setAnimation = ( onLoop: LoopAnimator ): void => {
    animation = onLoop;
};

export const setRender = ( onLoop: LoopRender ): void => {
    render = onLoop;
};

const animate = ( timestamp?: any ) => {
    requestAnimationFrame( animate );

    if( !lastTime ){
        lastTime = timestamp;
        return;
    }

    DELTATIME = timestamp - lastTime;
    lastTime = timestamp;

    animation();
    render();
};


const startLoop = () => {
    render = () => { RENDERER.render( SCENE, CAMERA ) };
    animation = () => { };
    animate();
};

export { startLoop, DELTATIME }
