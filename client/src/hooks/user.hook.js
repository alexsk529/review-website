import React from 'react';

export const useUser = () => {
    const [user, setUser] = React.useState();

    return {user, setUser}
}