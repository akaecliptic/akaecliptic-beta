import { PerspectiveCamera, Scene, WebGLRenderer } from "@utils/aethree";
import { WindowResizeCallback } from "../auxiliaries/types";

export var SCENE: Scene;
export var CAMERA: PerspectiveCamera;
export var RENDERER: WebGLRenderer;
export var WINDOW_RESIZE: WindowResizeCallback;

export const init = (): void => {
    SCENE = new Scene();
    CAMERA = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 10000);
    RENDERER = new WebGLRenderer({ 
        powerPreference: "high-performance",
        antialias: true
    });

    RENDERER.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( RENDERER.domElement );
};

export const setWindowResize = ( callback: WindowResizeCallback ): void => {
    WINDOW_RESIZE = callback;
};
