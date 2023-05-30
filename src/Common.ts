import { userAgent } from "next/server"

export const isMobile = () =>{
    return 'ontouchstart' in globalThis.window || navigator.maxTouchPoints > 1
}

export const getDeviceType = () => {
    if(isMobile()) {
        if(/(android)/i.test(navigator.userAgent))
            return deviceType.Android

        return deviceType.iOS
    }
    return deviceType.PC
}

export enum deviceType {
    PC,
    iOS,
    Android
}
