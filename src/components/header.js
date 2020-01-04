import React from "react"
import { Link } from "gatsby"

class Header extends React.Component {

    state = { showMenu: false }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        const menuActive = this.state.showMenu ? 'expanded' : '';
        const siteTitle = this.props.siteTitle;
        return (
            <header
                style={{
                    background: `rebeccapurple`,
                    marginBottom: `0`,
                }}
            >
                <div className={`navbar ${menuActive}`} style={{
                    margin: `0 auto`,
                    padding: `1.45rem 1.0875rem`,
                    display: 'flex'
                }}>
                    <div className="navbar-header">
                        <h1 style={{ margin: 0 }}>
                            <Link
                                to="/"
                                style={{
                                    color: `white`,
                                    textDecoration: `none`,
                                }}
                            >
                                {siteTitle}
                            </Link>
                        </h1>
                        <div role="button" className={`hamburger ${menuActive}`} tabIndex={0} onClick={this.toggleMenu} onKeyPress={this.toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={`nav-menu ${menuActive}`} >
                        <div className="menu-container">
                            <div className="column">
                                <span>Docs</span>
                                <ul className="nav-links">
                                    <li><Link to="/docs/gatsby/">Gatsby</Link></li>
                                    <li><Link to="/docs/wordpress/">WordPress</Link></li>
                                </ul>
                            </div>
                            <div className="column">
                                <span>Work</span>
                                <ul className="nav-links">
                                    <li><Link to="/todo/">ToDo's</Link></li>
                                </ul>
                            </div>
                            <div className="column">
                                <span>About</span>
                                <ul className="nav-links">
                                    <li><Link to="/about/">About</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
};

export default Header