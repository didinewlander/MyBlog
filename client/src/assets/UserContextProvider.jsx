import {createContext, useState} from "react";
import PropTypes from "prop-types";
export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [userInfo,setUserInfo] = useState({});
    return (
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
