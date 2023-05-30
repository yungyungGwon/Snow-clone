import { CameraModule } from "@/CameraModule"
import { useEffect } from "react"

const Index = () => {
    useEffect(() => {
        console.log('[index.tsx]', CameraModule().getUserDevice())

    }, [])
    return(
        <>
        <div>Hello</div>
        </>
    )
}

export default Index
