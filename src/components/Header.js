import {Link} from "react-router-dom"

const Header = (props) => {
    return (
        <nav className="nav">
            <Link to="/">
                <div>Do you like Cheese?</div>
            </Link>
        </nav>
    )
}

export default Header;