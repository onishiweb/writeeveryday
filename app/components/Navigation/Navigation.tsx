import { IconArrow } from "~/assets/IconArrow"
import { Link } from "react-router"

import "./Navigation.css";

export const Navigation = ({ currentDay, totalPrompts, currentDayOfYear }: { currentDay: number, totalPrompts: number, currentDayOfYear: number }) => {
    return (
        <>
        {currentDay > 1 && (
            <Link to={`/day/${currentDay - 1}`} aria-label="Previous day" className="navigation-button navigation-button--left">
                <IconArrow size={32} className="rotate-180" />
            </Link>
        )}
        {(currentDay < totalPrompts && currentDay < currentDayOfYear) && (
            <Link to={`/day/${currentDay + 1}`} aria-label="Next day" className="navigation-button navigation-button--right">
                <IconArrow size={32} />
            </Link>
        )}
        </>
    )
};