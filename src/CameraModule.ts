export const CameraModule = () => {

    /**
     * Device Type
     */

    /**
     * Get device ID only videoInput and back camera
     */
    const getAvailableDeviceId = async() => {
        const cameraDevices = (await navigator.mediaDevices.enumerateDevices()).filter((mediaDevice) => mediaDevice.kind === 'videoinput')

        if(cameraDevices.length === 0)
            return Error;

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

    return {getUserDevice}
}