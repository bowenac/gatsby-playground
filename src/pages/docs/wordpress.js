import React from "react"
import SEO from "../../components/seo"
import DocsLayout from "../../components/docs/docs-layout"
import DocsSidebar from "../../components/docs/docs-sidebar"
import Footer from "../../components/footer"
import { useEffect } from "react"
import Prism from "prismjs"

const WordPressDocsPage = ({ location }) => {

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
                title="WordPress Docs"
                description="WordPress Documentation for myself"
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
                            <DocsSidebar docs="wordpressdocs" heading="WordPress Docs" parentlink="/docs/wordpress/" />
                        </div>
                        <div className="docs">
                            <div class="container">
                                <h1>WordPress Docs!</h1>
                                <h3>Not much to put here... Just an example of a separate docs section.</h3>
                                <p>Will probably change these docs to integrating WordPress in gatsby so it has it's own section of docs. Just random code examples for testing currently...</p>
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

export default WordPressDocsPage