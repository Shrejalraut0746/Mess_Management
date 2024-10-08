import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh"


const PersistentLogin = () => {
    const refresh = useRefresh();
    const {auth} = useAuth();
    const [refreshing , isRefreshing] = useState(true)

    useEffect(() => {
        const verifyCookie = async () => {
            try {
                await refresh()
            } catch (error) {
                console.log(error);
            }
            finally
            {
                isRefreshing(false)
            }
        }

        if (!auth?.accessToken) {
            verifyCookie();
        } else {
            isRefreshing(false);
        }
    } , [auth,refresh]);

    return (
        refreshing ? <p>Loading ....</p> : <Outlet />
    )
}

export default PersistentLogin