import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

export const Theme = () => {
    const { theme, setTheme, applyTheme } = useContext(AppContext);

    useEffect(() => {
        applyTheme();
    }, [theme])

    return (
        <>
            {theme == 'light'
                ?
                <i onClick={() => setTheme('dark')} title='Dark-Theme' className="fa fa-moon" />
                :
                <i onClick={() => setTheme('light')} title='Light-Theme' className="fa fa-sun" />
            }
        </>
    )
}
