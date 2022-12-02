import { updatePlanetLabels } from "../auxiliaries/functions";
import { NameDisplayOptions } from "../auxiliaries/types";

const options: HTMLDivElement = document.getElementById( 'settings' ) as HTMLDivElement;
const close: HTMLImageElement = document.getElementById( 'settings-close' ) as HTMLImageElement;
const selectNames: HTMLSelectElement = document.getElementById( 'settings-names' ) as HTMLSelectElement;

// Button Clicks

close.onclick = (): void => {
    toggleSettings( true );
};

selectNames.onchange = (): void => {
    updatePlanetLabels( Number.parseInt(selectNames.value) as NameDisplayOptions );
};

// Toggle

export const toggleSettings = ( hide: boolean ): void => {
    if( hide ){
        options.classList.add( 'hidden' );
    }else{
        options.classList.remove( 'hidden' );
    }
};
