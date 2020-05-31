import React, {createContext, useState, useEffect} from 'react';
import appConfig from '../../config/appConfig'

const userContext = createContext();

const UserContextProvider = ({children}) => {    
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    let ProfilName = JSON.parse((window.localStorage.getItem(appConfig.ProfilName)));
    let Localtoken = window.localStorage.getItem(appConfig.Localtoken)
    if(ProfilName) {
        setUser({...ProfilName,token: Localtoken})
    }
  }, [])
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export {UserContextProvider};
export default userContext;