import { CameraModule } from "@/CameraModule"
import { useEffect } from "react"

const Index = () => {
    useEffect(() => {
        CameraModule().getUserDevice().then((result) => {console.log(result)})
    }, [])
    return(
        <>
        <div>Hello</div>
        </>
    )
}

export default Index
