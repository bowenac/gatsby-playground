import React from "react"
import SEO from "../../components/seo"
import DocsLayout from "../../components/docs/docs-layout"
import DocsSidebar from "../../components/docs/docs-sidebar"
import Footer from "../../components/footer"
import { useEffect } from "react"
import Prism from "prismjs"

const GatsbyDocsPage = ({ location }) => {

    useEffect(() => {
        Prism.highlightAll()
    })

    const { useState } = React;
    const [open, setOpen] = useState(false);
    const clickHandler = () => {
        setOpen(!open);
    };

    return (
        <DocsLayout>
            <SEO
                title="Gatsby Docs"
                description="Documenting Gatsby through my journey!"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
                pathname={location.pathname}
            />
            <section className="full has-sidebar">
                <div className="container">
                    <div className="row">
                        <div className={'sidebar' + (open ? ' active' : '')} style={{
                            background: `#f7f7f8`,
                            marginBottom: `0`,
                        }}>
                            <DocsSidebar docs="gatsbydocs" heading="Gatsby Docs" parentlink="/docs/gatsby/" />
                        </div>
                        <div className="docs">
                            <div className="container">
                                <h1>Gatsby Docs!</h1>

                                <h3>Do you have node installed?</h3>
                                <p>If not download and install it <a target="_blank" rel="noopener noreferrer" href="https://nodejs.org/">NodeJs</a></p>
                                <p>Once installed open node console</p>
                                <br></br>

                                <h3>Install the Gatsby CLI</h3>
                                <p>-g is installing it globally</p>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`npm install -g gatsby-cli`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <br></br>
                                <br></br>

                                <h3>Change directory to where you want to create a new gatsby app</h3>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`cd C:\\xampp\\htdocs\\react_projects`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <br></br>
                                <br></br>

                                <h3>Create a new site</h3>
                                <p>Change project-name to whatever you want it to be called</p>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`gatsby new project-name`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>

                                <p>Or if you want to create a new gatsby site from a repo you would use the github url to the gatsby project e.g. https://github.com/bowenac/gatsby-playground</p>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`gatsby new project-name https://github.com/bowenac/gatsby-playground`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <br></br>
                                <br></br>

                                <br></br>
                                <br></br>

                                <h3>Change directory into site folder</h3>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`cd project-name`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <br></br>
                                <br></br>

                                <h3>Run gatsby develop</h3>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`gatsby develop`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <p>Gatsby will start a hot-reloading development environment accessible by default at localhost:8000.</p>

                                <p>Try editing the JavaScript pages in src/pages. Saved changes will live reload in the browser.</p>
                                <br></br>
                                <br></br>

                                <h3>Run via VSCode</h3>
                                <p>Once the project has been created, you can open the project folder via VSCode and use the built in terminal.</p>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`npm run develop`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <br></br>
                                <br></br>

                                <h3>Build for Production</h3>
                                <p>I like to run a clean before running a build</p>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`gatsby clean`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`gatsby build`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <p>To test production run gatsby serve which will start a production build at localhost:9000</p>
                                <pre className="language-shell line-numbers">
                                    <code>
                                        {`gatsby serve`}
                                    </code>
                                    <span className="line-numbers-rows"><span></span></span>
                                </pre>
                                <Footer />
                            </div>
                            <div className={'sidebar-toggle' + (open ? ' active' : '')} onClick={clickHandler} onKeyPress={clickHandler} tabIndex={0} role="button">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DocsLayout >
    )
}

export default GatsbyDocsPage