import { Mesh, Sphere } from "@utils/aethree";
import { CSS3DObject, CSS3DRenderer } from "@utils/aethree";
import { CSS2DObject, CSS2DRenderer } from "@utils/aethree";
import { Planet } from "../classes/Planet";
import { PlanetName } from "../auxiliaries/types";

export var RENDERER3D: CSS3DRenderer;
export var RENDERER2D: CSS3DRenderer;

export const initLabelRenders = ( ): void => {
    RENDERER2D = new CSS2DRenderer();
    RENDERER3D = new CSS3DRenderer();
    
    document.body.appendChild( RENDERER2D.domElement );
    document.body.appendChild( RENDERER3D.domElement );

    RENDERER2D.setSize( window.innerWidth, window.innerHeight );
    RENDERER3D.setSize( window.innerWidth, window.innerHeight );

    RENDERER2D.domElement.style.position = 'absolute';
    RENDERER2D.domElement.style.top = '0';
    RENDERER3D.domElement.style.position = 'absolute';
    RENDERER3D.domElement.style.top = '0';
};

export const makeLabels = ( planet: Planet ): void => {
    let planetSphere: any = ( planet.raw.children[0] as Mesh ).geometry.boundingSphere;
    
    let dist: number = ( planetSphere != null ) ? ( planetSphere as Sphere ).radius : 10;
    
    let planetDiv: HTMLDivElement = document.createElement( 'div' );
    planetDiv.className = 'labels';
    planetDiv.textContent = ( planet.name.includes( 'TODO' ) ? '' : planet.name );
    
    let planetLabel: CSS2DObject = new CSS2DObject( planetDiv );
    planetLabel.position.set( 0, dist, 0 );
    planetLabel.name = 'Label';
    
    planet.raw.add( planetLabel );

    dist = ( planet.name === 'Profile' ) ? dist + 15 : dist;

    addSelectionArea( planet, dist );
    addStyles( planet.name, dist )
};


const addSelectionArea = ( planet: Planet, radius: number ): void => {
    
    let selectionDiv: HTMLDivElement = document.createElement( 'div' );
    selectionDiv.className = 'selectionArea';

    selectionDiv.style.height = `${ radius + 12 }px`;
    selectionDiv.style.width = `${ radius + 12 }px`;

    let selectionArea: CSS3DObject = new CSS3DObject( selectionDiv );
    selectionArea.name = 'Area';

    planet.raw.add( selectionArea );
};

const addStyles = ( id: PlanetName, dist: number ): void => {
    let styles: CSSStyleSheet = window.document.styleSheets[0];

    styles.insertRule( `#${ id } { animation: target-${ id } .25s forwards; }`,
        styles.cssRules.length 
    );

    styles.insertRule( `@keyframes target-${ id } {
            0%  { height: 0px; width: 0px }
            100% { height: ${ dist + 20 }px; width: ${ dist + 20 }px }
        }`,
        styles.cssRules.length 
    );
};

export const addTargetSelection = ( planet: Planet ): void => { 
    let planetSphere: any = ( planet.raw.children[0] as Mesh ).geometry.boundingSphere;
    
    let dist: number = ( planetSphere != null ) ? ( planetSphere as Sphere ).radius : 10;
    dist = ( planet.name === 'Profile' ) ? dist + 15 : dist;

    let selectionDiv: HTMLImageElement = document.createElement( 'img' );
    selectionDiv.className = 'targetSelection';
    selectionDiv.id = planet.name;
    selectionDiv.src = 'assets/images/crosshair.svg'

    let selectionArea: CSS3DObject = new CSS3DObject( selectionDiv );
    selectionArea.name = 'Outline';

    planet.raw.add( selectionArea );
};
