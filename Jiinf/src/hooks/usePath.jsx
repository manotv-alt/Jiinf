import { useLocation } from "react-router-dom"

{/*Localization pathname function*/}
export const usePath = () => {

    const isCurrentPage = (link) => {
        const { pathname } = useLocation();

        if (link === pathname) return true;

        return false;
    };

    return {
        isCurrentPage,
    };
};