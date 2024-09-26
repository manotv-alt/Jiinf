import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NextArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer"
            onClick={onClick}
        >
            <FaChevronRight className="rounded-full pl-1.5 border-[2px] border-jiinf-secondary bg-white text-5xl hover:text-white hover:bg-jiinf-secondary text-jiinf-secondary transition-colors duration-300" />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer"
            onClick={onClick}
        >
            <FaChevronLeft className="rounded-full pr-1.5 border-[2px] border-jiinf-secondary bg-white text-5xl hover:text-white hover:bg-jiinf-secondary text-jiinf-secondary transition-colors duration-300" />
        </div>
    );
};

export { PrevArrow, NextArrow }