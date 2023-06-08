import { CameraResolution, deviceType, getDeviceType } from "./Common"

/**
 * Camera Module
 * @returns getUserDevice()
 */
export const CameraModule = () => {
    /**
     * Initialize video camera with device id and resoltuion
     */
    const intiVideoCamera = async (deviceId: string, resoltuion: CameraResolution) => {
        try {
            const [ width, height ]: number[] = resoltuion.split('x').map(Number)
            return (
                await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        width: { exact: width },
                        height: { exact: height },
                        aspectRatio: { exact: width / height },
                        deviceId: deviceId
                    }
                })
            )
        } catch (error){
            throw new Error(`Unable to setup camera device for the following reason: ${error}`)
        }

    }

    /**
     * Get device ID 
     * If access device is mobile, get videoInput and back camera
     * If is not mobile device, get first index camera ID
     */
    const getAvailableDeviceId = async() => {
        const cameraDevices = (await navigator.mediaDevices.enumerateDevices()).filter((mediaDevice) => mediaDevice.kind === 'videoinput')

        if (cameraDevices.length === 0)
            return Error

        switch(getDeviceType()){
            case deviceType.iOS:
                return cameraDevices[1].deviceId
            case deviceType.Android:
                return cameraDevices[cameraDevices.length - 1].deviceId
            case deviceType.PC:
                return cameraDevices[0].deviceId
            default:
                throw Error
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
                    const availableCameraId =  getAvailableDeviceId()
                    const mediaStream = intiVideoCamera(availableCameraId, resolution)
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