import React from 'react'
import c from './Preloader.module.css'

const Preloader = () => {
    return (
            <div className={c.loader}>
                <div className={c.l_main}>
                    <div className={c.l_square}><span></span><span></span><span></span></div>
                    <div className={c.l_square}><span></span><span></span><span></span></div>
                    <div className={c.l_square}><span></span><span></span><span></span></div>
                    <div className={c.l_square}><span></span><span></span><span></span></div>
                </div>
            </div>
    )
}

export default Preloader