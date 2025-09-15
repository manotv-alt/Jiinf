import { useLocation } from 'react-router-dom';

export const usePath = () => {
    const { pathname } = useLocation();

    const isCurrentPage = (link) => {
        return link === pathname;
    };

    return {
        isCurrentPage,
    };
};