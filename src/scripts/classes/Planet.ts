import { Group, Object3D } from "@utils/aethree";
import { OutlinePass } from "@utils/aethree";
import { CSS2DObject } from "@utils/aethree";
import { CSS3DObject } from "@utils/aethree";
import { CON_GRAVITATIONAL, CON_ROTATIONAL } from "../auxiliaries/constants";
import { getRandomInt } from "../auxiliaries/functions";
import { IPlanet } from "../auxiliaries/shapes";
import { PlanetName, PlanetNameLocal, NameDisplayOptions, SolarSystem, Sun } from "../auxiliaries/types";
import { DELTATIME } from "../components/animationLoop";
import { isFocused, setCameraTarget, setFocus } from "../components/cameraControls";
import { CAMERA } from "../components/fundamentals";
import { addTargetSelection } from "../components/labels";
import { populateArticles, toggleHidden } from "../webpage";

export class Planet implements IPlanet {
    private static initialAngle: number = Math.PI;

    name: PlanetName;
    localName: PlanetNameLocal;
    angleMoved: number;
    orbitalDistance: number;
    orbitalSpeed: number;
    rotationSpeed: number;
    raw: Object3D;

    constructor(name: PlanetName, localName: PlanetNameLocal, distance: number, speed: number, rotation: number, raw: Object3D){
        this.name = name;
        this.localName = localName;
        this.angleMoved = 0 - getRandomInt(360);
        this.orbitalDistance = distance;
        this.orbitalSpeed = speed;
        this.rotationSpeed = rotation;
        this.raw = raw;
    }

    public static createPlanetsFromGroup( source: Group ): SolarSystem {
        let sun: Sun | unknown = null;
        let planets: Planet[] = [];

        source.children.forEach( child => {
            if( child.name !== 'Planet-Sun' ){
                planets.push( this.getInitialValues( child ) );
            }else{
                sun = child;
            }
        });

        return [ sun as Sun, planets ];
    };

    private static getInitialValues( raw: Object3D ): Planet {
        let planet: Planet | any = null;

        switch( raw.name ){
            case 'Planet-1':
                planet = new Planet('Profile', 'Teferi Kosi', 325, .25, .25, raw);
                break;
            case 'Planet-2':
                planet = new Planet('TODO_1', 'Hasari', 75, .75, .75, raw);
                break;
            case 'Planet-3':
                planet = new Planet('TODO_2', 'Omiri', 125, .65, .65, raw);
                break;
            case 'Planet-4':
                planet = new Planet('Personal', 'Rafeki', 200, .55, .50, raw);
                break;      
            case 'Planet-5':
                planet = new Planet('About', 'Inari Kosi', 400, .1, .1, raw);
                break;
        }

        planet.setOrbitStart();
        return planet as Planet;
    }

    private setOrbitStart( ): void {
        let totalAngle = Planet.initialAngle + this.angleMoved;
        
        let xPos = Math.sin( totalAngle ) * this.orbitalDistance;
        let zPos = Math.cos( totalAngle ) * this.orbitalDistance;

        this.raw.position.x = xPos;
        this.raw.position.z = zPos;
    }

    public updateOrbit( ): void {
        this.angleMoved -= CON_GRAVITATIONAL * DELTATIME * this.orbitalSpeed;
        let totalAngle = Planet.initialAngle + this.angleMoved;
        
        let xPos = Math.sin( totalAngle ) * this.orbitalDistance;
        let zPos = Math.cos( totalAngle ) * this.orbitalDistance;
        
        this.raw.position.x = xPos;
        this.raw.position.z = zPos;
    }
    
    public updateRotation( ): void {
        this.raw.rotation.y += DELTATIME * CON_ROTATIONAL * this.rotationSpeed;

        this.raw.children.forEach( child => {
            if( child.name == 'Label' || child.name == 'Area' || child.name == 'Outline' )
                child.lookAt( CAMERA.position );
        });
    }

    public setOnClick( outliner: OutlinePass ): void {
        let selection: CSS3DObject = this.raw.getObjectByName( 'Area' ) as CSS3DObject;
        
        selection.element.onpointerover = ( ) => { 
            if( !isFocused ){
                addTargetSelection( this );
                outliner.selectedObjects = [ ...this.raw.children ];
            }
        };
        selection.element.onpointerout = ( ) => { 
            outliner.selectedObjects = [];
            this.raw.remove( this.raw.getObjectByName( 'Outline' ) as CSS3DObject ); 
        };
        selection.element.onclick = ( ): void => {
            toggleHidden( false );
            setFocus( true );
            populateArticles( this.name );
            outliner.selectedObjects = [ ];
            setCameraTarget( this.raw.position );
        };
    }

    public updateLabel( type: NameDisplayOptions ): void {
        this.raw.children.forEach( child => {
            if( child.name == 'Label' ){
               let label: CSS2DObject = child as CSS2DObject;

                if( type == 2 ) 
                    label.element.innerHTML = '';
                else
                    label.element.innerHTML = ( type == 0 ) ? ( this.name.includes( 'TODO' ) ? '' : this.name ) : this.localName;
            }
        });
    }
} 
