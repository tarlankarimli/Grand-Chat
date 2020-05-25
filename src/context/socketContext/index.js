import React, {createContext, useState} from 'react';

const socketContext = createContext();

const SocketContextProvider = ({children}) => {    
  const [socket, setSocket] = useState(undefined);
  
    return (
        <socketContext.Provider value={{socket, setSocket}}>
            {children}
        </socketContext.Provider>
    )
}

export {SocketContextProvider};
export default socketContext;