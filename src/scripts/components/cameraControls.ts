import { Vector3 } from "@utils/aethree";
import { OrbitControls } from "@utils/aethree";
import { Renderers } from "../auxiliaries/types";
import { CAMERA } from "./fundamentals";

export var CAMERA_CONTROLLER: OrbitControls;
export var isFocused: boolean = false;

export const setUpCameraController = ( renderer: Renderers ): void => {
    CAMERA_CONTROLLER = new OrbitControls( CAMERA, renderer.domElement );

    CAMERA_CONTROLLER.enablePan = false;
    CAMERA_CONTROLLER.enableDamping = true;
    CAMERA_CONTROLLER.dampingFactor = .05;
    CAMERA_CONTROLLER.autoRotateSpeed  = .15;
    
    setFocus( false );
    setCameraTarget( );
    allowClickPropagation( );
};

export const setCameraTarget = ( target?: Vector3 ): void => {
    if( !target ){
        CAMERA_CONTROLLER.target = new Vector3( 0, 0, 0 );
    }else{
        CAMERA_CONTROLLER.target = target;
    }
};

export const setFocus = ( value: boolean ): void => {
    if( value ){
        CAMERA_CONTROLLER.maxDistance = 100;
        CAMERA_CONTROLLER.minDistance = 50;
        CAMERA_CONTROLLER.autoRotate = true;
    }else{
        CAMERA_CONTROLLER.maxDistance = 700;
        CAMERA_CONTROLLER.minDistance = 250;
        CAMERA_CONTROLLER.autoRotate = false;
        CAMERA.position.set( 0, 450, 500 );
    }

    isFocused = value;
};

const allowClickPropagation = ( ): void => {
    CAMERA_CONTROLLER.domElement.onpointerdown = ( ev: PointerEvent ) => {
        let child: any = ev.target;

        if( child instanceof HTMLDivElement && isFocused === false )
            if( child.className === 'selectionArea' )
                child.click();
    };
};

