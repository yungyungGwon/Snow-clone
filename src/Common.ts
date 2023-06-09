/**
 * Check access device PC or mobile(Android, iOS)
 * @returns Whather than mobie or not
 */
export const isMobile = () =>{
    return 'ontouchstart' in globalThis.window || navigator.maxTouchPoints > 1
}

/**
 * Return device type based on isMobile()
 * @returns device type
 */
export const getDeviceType = () => {
    if (isMobile()) {
        if(/(android)/i.test(navigator.userAgent))
            return deviceType.Android

        return deviceType.iOS
    }
    return deviceType.PC
}

/**
 * Device type 
 */
export enum deviceType {
    PC,
    iOS,
    Android
}
