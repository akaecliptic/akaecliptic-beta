const popup: HTMLDivElement = document.getElementById( 'popup' ) as HTMLDivElement;
const close: HTMLImageElement = document.getElementById( 'popup-close' ) as HTMLImageElement;
const body: HTMLDivElement = document.getElementById( 'popup-body' ) as HTMLDivElement;
const title: HTMLHeadingElement = document.getElementById( 'popup-title' ) as HTMLHeadingElement;

// Button Clicks

close.onclick = (): void => {
    togglePopup( true );
};

// Resets

const clearPopup = (): void => {
    body.innerHTML = '';
    title.innerHTML = '';
};

// Toggle

export const togglePopup = ( hide: boolean ): void => {
    if(hide){
        popup.classList.add( 'hidden' );
        clearPopup();
    }else{
        popup.classList.remove( 'hidden' );
    }
};

// Content

export const getCodeContent = (): void => {
    title.innerHTML = 'Code';
    body.innerHTML = 
    `
        <h4>Some Background</h4>
        <p>This website was developed in two parts*:</p>
        <p>
            Part 1 - Was a prototype developed entirely in basic JavaScript, HTML and CSS.
            This was done to understand the basics of ThreeJS, becoming more comfortable 
            with the library.
        </p>
        <p>
            Part 2 - Was a complete re-write of the first part using more 'advanced' technologies, 
            and is the part you are seeing now. Ironing out any kinks to produce a more well-rounded app. Even 
            now this website is still at the beginning of the learning curve, but more iterations will be made.
        </p>
        <p>
            REFACTOR - This wasn't known at the time, but there is the third and final part, the last re-write.
            Developed using NextJS, currently live at [ akaecliptic.dev ]. I promise I won't re-write this again...
        </p>
        <h4>Technologies Used</h4>
        <ul>
            <li>TypeScript - Main Language used to write both front and back end functionality.</li>
            <li>SASS - Scripting language used for styling all portions of the website.</li>
            <li>ThreeJS - WebGL library responsible for rendering the website.</li>
            <li>Blender - Modeling program used to create planets.</li>
        </ul>
    `;
};

