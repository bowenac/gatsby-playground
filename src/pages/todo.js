import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ToDoPage = ({ location }) => (
    <Layout>
        <SEO
            title="ToDo's"
            description="ToDo's description"
            pathname={location.pathname}
        />
        <section>
            <div className="container">
                <h1>ToDos!</h1>

                <p>Just a list of things to work on.</p>

                {/* TODO: List of todos */}
                <ul>
                    <li><strike>Create a new fresh gatsby project just use the default starter theme and build off of that
                        <ul>
                            <li>Commit initial starter theme to github</li>
                        </ul>
                    </strike></li>
                    <li><strike>Create image component to just call something like Image imgName="gatsby-astronaut.png" and commit it</strike></li>
                    <li><strike>Create a component for a hero</strike></li>
                    <li>Create a form and contact page, submit to netlify...</li>
                    <li>Create a component for slider using slickslider</li>
                    <li>Create different menu types as components for quick starter menus:
                        <ul>
                            <li>/components/menus/menu-1, menu-2, menu-3 etc</li>
                            <li>Call the menu component from layout.js</li>
                            <li>Add styles in same folders for each menu type, keep it organized</li>
                            <ul>
                                <li>Standard menu with hamburger/dropdown on mobile</li>
                                <li>Always Hamburger
                            <ul>
                                        <li>Full Screen</li>
                                        <li>Slide In</li>
                                    </ul>
                                </li>
                            </ul>
                        </ul>
                    </li>
                    <li>Strapi Integration:
                        <ul>
                            <li>Pages</li>
                            <li>Blog Posts</li>
                            <li>Images</li>
                        </ul>
                    </li>
                    <li>WordPress Integration:
                        <ul>
                            <li>Pages</li>
                            <li>Blog Posts</li>
                            <li>Custom Post Types</li>
                            <li>Advanced Custom Fields</li>
                            <li>Images</li>
                        </ul>
                    </li>
                    <li>Craft CMS Integration:
                        <ul>
                            <li>Single Entries</li>
                            <li>Channels</li>
                            <li>All field types, matrix etc</li>
                            <li>Images</li>
                        </ul>
                    </li>
                    <li>Create Gatsby Documentation Starter
                        <ul>
                            <li>Setup Base for Documentation</li>
                            <li>Create markdown files to be used for documentation section</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>

    </Layout >
)

export default ToDoPage
