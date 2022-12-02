import { PlanetName } from "../auxiliaries/types";
import { setCameraTarget, setFocus } from "../components/cameraControls";
import { getCodeContent, togglePopup } from "./popup";
import { toggleSettings } from "./settings";

const closeButton: HTMLSpanElement = document.getElementById( 'btn-close' ) as HTMLSpanElement;
const articleRight: HTMLElement = document.getElementById( 'right' ) as HTMLElement;
const articleLeft: HTMLElement = document.getElementById( 'left' ) as HTMLElement;

const containerLeft: HTMLDivElement = articleLeft.children[0] as HTMLDivElement;
const containerRight: HTMLDivElement = articleRight.children[0] as HTMLDivElement;

const code: HTMLHeadingElement = document.getElementById( 'btn-code' ) as HTMLHeadingElement;
const settings: HTMLHeadingElement = document.getElementById( 'btn-settings' ) as HTMLHeadingElement;

// Button Clicks

closeButton.onclick = ( ): void => {
    toggleHidden( true );
    
    clearArticles( );
    setCameraTarget( );
    setFocus( false );
};

code.onclick = ( ): void => {
    getCodeContent();
    togglePopup( false );
};

settings.onclick = ( ): void => {
    toggleSettings( false );
};

// Toggle Functions

export const toggleHidden = ( hide: boolean ): void => {
    if (hide) {
        articleRight.classList.add( 'hidden' );
        articleLeft.classList.add( 'hidden' );
        closeButton.classList.add( 'hidden' );
    } else {
        articleRight.classList.remove( 'hidden' );
        articleLeft.classList.remove( 'hidden' );
        closeButton.classList.remove( 'hidden' );
    }
};

const clearArticles = ( ): void => {
    containerLeft.innerHTML = '';
    containerRight.innerHTML = '';
};

// Auxiliary Functions

export const populateArticles = ( topic: PlanetName ): void => {
    switch( topic ){
        case 'TODO_1':
            getTemp1Content();
            break;
        case 'TODO_2':
            getTemp2Content();
            break;
        case 'Personal': 
            getPersonalContent();
            break;
        case 'Profile':
            getProfileContent();
            break;
        case 'About' : 
            getAboutContent();
            break;
    }
};

// Where The Light Doesn't Touch

const getProfileContent = (): void => {
    let contentLeft: string = `
        <h3 class="title">Teferi Kosi</h3>
        <hr>
        <p>
            Teferi Kosi is the largest planet in the system, 
            originally discovered by DR. Kosi in the early 2###s. 
            Teferi was the first of the two outer planets obeserved 
            using the Kosi method.
        </p>
    `;

    let contentRight: string = ``;
        
    containerLeft.innerHTML = contentLeft;
    containerRight.innerHTML = contentRight;
};

const getAboutContent = (): void => {
    let contentLeft: string = `
        <h3 class="title">Inari Kosi</h3>
        <hr>
        <p>
            Inari Kosi is the second largest planet in the system, 
            as well as the outer-most planet discovered. 
            Inari is the second planet to be discovered by DR. Kosi using her Kosi method.
        </p>
    `;

    let contentRight: string = ``;
        
    containerLeft.innerHTML = contentLeft;
    containerRight.innerHTML = contentRight;
};

const getPersonalContent = (): void => {
    let contentLeft: string = `
        <h3 class="title">Rafeki</h3>
        <hr>
        <p>
            Rafeki was the first planet to be discovered when observing the system.
            It's orbital period and hazy blue-green glow is reminiscent of the Earth once known.
        </p>
    `;

    let contentRight: string = ``;
        
    containerLeft.innerHTML = contentLeft;
    containerRight.innerHTML = contentRight;
};

const getTemp1Content = (): void => {
    let contentLeft: string = `
        <h3 class="title">Hasari</h3>
        <hr>
        <p>
            Hasari is the inner-most planet in the system and has the shortest 
            orbital period. The Scorching planet is said to have oceans of molten metal.
        </p>
    `;

    let contentRight: string = ``;
        
    containerLeft.innerHTML = contentLeft;
    containerRight.innerHTML = contentRight;
};

const getTemp2Content = (): void => {
    let contentLeft: string = `
        <h3 class="title">Omiri</h3>
        <hr>
        <p>
            Omiri was the second planet discovered in the system. It's orbit marks the 
            region in which the system's planets could sustain water-ice.
        </p>
    `;

    let contentRight: string = ``;
        
    containerLeft.innerHTML = contentLeft;
    containerRight.innerHTML = contentRight;
};
