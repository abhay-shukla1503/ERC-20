import {Link} from "react-router-dom";
const Navigation=()=>{
    return(
        <header>
            <div className="logo">ERC-20</div>
            <nav>
                <ul>
                    <li>
                        <Link className="nav_link" to="/">
                          Home
                        </Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/mint">
                          Mint
                        </Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/approve">
                          Approve
                        </Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/transfer">
                          Transfer
                        </Link>
                    </li>
                    <li>
                        <Link className="nav_link" to="/burn">
                          Burn
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navigation;