import { IconArrow } from "~/assets/IconArrow"
import { Link } from "react-router"

import "./Navigation.css";

export const Navigation = ({ currentDay, totalPrompts }: { currentDay: number, totalPrompts: number }) => {
    return (
        <>
        {currentDay > 1 && (
            <Link to={`/day/${currentDay - 1}`} className="navigation-button navigation-button--left">
            <IconArrow size={32} className="rotate-180" />
            </Link>
        )}
        {(currentDay < totalPrompts) && (
            <Link to={`/day/${currentDay + 1}`} className="navigation-button navigation-button--right">
            <IconArrow size={32} />
            </Link>      
        )}
        </>
    )
};