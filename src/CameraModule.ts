import { deviceType, getDeviceType } from "./Common"

/**
 * Camera Module
 * @returns getUserDevice()
 */
export const CameraModule = () => {

    /**
     * Get device ID 
     * If access device is mobile, get videoInput and back camera
     * If is not mobile device, get first index camera ID
     */
    const getAvailableDeviceId = async() => {
        const accessDeviceType = getDeviceType()
        const cameraDevices = (await navigator.mediaDevices.enumerateDevices()).filter((mediaDevice) => mediaDevice.kind === 'videoinput')

        if (cameraDevices.length === 0)
            return Error;

        if (accessDeviceType === deviceType.iOS) {
            // camera index[1] 

        } else if (accessDeviceType === deviceType.Android) {
            // camera index[0]
        } else if(accessDeviceType === deviceType.PC){
            // camera index[0]
        }
    }

    /**
     * Get permission avaliable camera on user device
     */
    const getUserDevice = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({video: true, audio: false})
            
            await navigator.permissions.query(<PermissionDescriptor><unknown>{name : 'camera'}).then(((permissionStatus: PermissionStatus) => {
                // permission status values are granted and prompt, denied
                if(permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
                    getAvailableDeviceId()
                }
                else
                    throw Error
            }))

        } catch(error) {
            console.error('[CameraModule_error]', error)
        }
        
    }

    return { getUserDevice }
}