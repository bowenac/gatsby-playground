import React from "react"

const Footer = () => (
    <footer>
        <div className="container">
            © {new Date().getFullYear()}, Built with {` `}
            <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">Gatsby</a> by <a target="_blank" rel="noopener noreferrer" href="https://adamcbowen.com">Adam Bowen</a>
        </div>
    </footer>
)

export default Footer