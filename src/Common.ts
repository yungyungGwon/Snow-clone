/**
 * Supported resolution
 */
export enum CameraResolution
{
    R640x480 = '640x480',
    R640x360 = '640x360',
    R960x720 = '960x720',
    R1280x720 = '1280x720'
}

/**
 * Device type 
 */
export enum deviceType {
    PC,
    iOS,
    Android
}

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