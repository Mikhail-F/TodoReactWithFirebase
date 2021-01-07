import React from "react";
import Preloader from "../assets/Preloader/Preloader";

const WithSuspense = (Component) =>{
    return () => {
        return (
            <React.Suspense fallback={<Preloader/>}><Component/></React.Suspense>
        )
    }
}

export default WithSuspense