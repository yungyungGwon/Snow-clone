export const isMobile = () =>{
    return 'ontouchstart' in globalThis.window
}

export const getDeviceType = () => {
    console.log('dfdfdf', isMobile())
    if(isMobile())
    return
}

export enum deviceType {
    PC,
    iOS,
    Android
}
