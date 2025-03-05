import { NavLink } from "react-router"

export default function TopNav() {
    return (
        <nav className="mb-5 border-b-2 pb-5">
            <NavLink to="/" className="mx-5">
                Home
            </NavLink>

            <NavLink to="/basic-react" className="mx-5">
                Basic React
            </NavLink>

            <NavLink to="/popup-ui" className="mx-5">
                Popup UI
            </NavLink>

            <NavLink to="/sidebar-ui" className="mx-5">
                Sidebar UI
            </NavLink>

            <NavLink to="/chat-ui" className="mx-5">
                Chat UI
            </NavLink>

            <NavLink to="/ollama" className="mx-5">
                Ollama
            </NavLink>

        </nav>
    )
}
    