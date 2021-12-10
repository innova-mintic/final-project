import React from 'react'
import { useUser } from '../context/user';

const PrivateComponent = ({roleList, children}) => {

    const { userData } = useUser();

    console.log('user data desde el pruvate component', userData)

    if (roleList.includes(userData.rol)){
        return children;
    }
    return <></>;
}

export default PrivateComponent;