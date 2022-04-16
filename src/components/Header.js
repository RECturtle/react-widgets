import React from "react";
import Link from "./Link";

const Header = () => {
    return (
        <div className="ui pointing menu">
            <Link href="/" className="item">
                Accordion
            </Link>
            <Link href="/list" className="item">
                Search
            </Link>
            <Link href="/dropdown" className="item">
                Dropdown
            </Link>
            <Link href="/reps" className="item">
                Reps
            </Link>
        </div>
    );
};

export default Header;
