import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from "@utils/aethree";
import { randFloat, randInt } from "@utils/aethree";
import { CON_BLOOM_LAYER, CON_STAR_COLOURS, CON_STAR_COUNT } from "../auxiliaries/constants";
import { getRandomBias } from "../auxiliaries/functions";
import { SCENE } from "./fundamentals";

const createStars = ( ): Points[] => {

    const bufferGeometry1: BufferGeometry = new BufferGeometry();
    const bufferGeometry2: BufferGeometry = new BufferGeometry();
    const bufferGeometry3: BufferGeometry = new BufferGeometry();

    const vertexGroup1: number[] = [];
    const vertexGroup2: number[] = [];
    const vertexGroup3: number[] = [];
    
    for ( let i = 0; i < CON_STAR_COUNT; i ++ ) {

        let distance: number = randInt( 750, 1000 ); 
        let theta: number = randFloat( 0, Math.PI * 2 ); 
        let phi: number = getRandomBias( 0, Math.PI, Math.PI / 2, 3 ); 

        if ( i % 10 === 0) { //Least Frequent
            vertexGroup1.push( distance * Math.sin( theta ) * Math.cos( phi ) ); // x
            vertexGroup1.push( distance * Math.sin( theta ) * Math.sin( phi ) ); // y
            vertexGroup1.push( distance * Math.cos( theta ) );                   // z
        } else if (i % 3 === 0) { //More Frequent
            vertexGroup2.push( distance * Math.sin( theta ) * Math.cos( phi ) ); // x
            vertexGroup2.push( distance * Math.sin( theta ) * Math.sin( phi ) ); // y
            vertexGroup2.push( distance * Math.cos( theta ) );                   // z
        } else { //Most Frequent
            vertexGroup3.push( distance * Math.sin( theta ) * Math.cos( phi ) ); // x
            vertexGroup3.push( distance * Math.sin( theta ) * Math.sin( phi ) ); // y
            vertexGroup3.push( distance * Math.cos( theta ) );                   // z
        }
    }

    bufferGeometry1.setAttribute( 'position', new Float32BufferAttribute( vertexGroup1, 3 ) );
    bufferGeometry2.setAttribute( 'position', new Float32BufferAttribute( vertexGroup2, 3 ) );
    bufferGeometry3.setAttribute( 'position', new Float32BufferAttribute( vertexGroup3, 3 ) );

    bufferGeometry1.rotateZ( 90 );
    bufferGeometry2.rotateZ( 90 );
    bufferGeometry3.rotateZ( 90 );

    return [ 
        new Points( bufferGeometry1, new PointsMaterial( { color: CON_STAR_COLOURS.least } ) ),
        new Points( bufferGeometry2, new PointsMaterial( { color: CON_STAR_COLOURS.mid } ) ),
        new Points( bufferGeometry3, new PointsMaterial( { color: CON_STAR_COLOURS.most } ) ) 
    ];

};

export const addStars = ( ): void => {
    createStars().forEach( cluster => {
        cluster.layers.set( CON_BLOOM_LAYER );
        SCENE.add( cluster );
    });
};
