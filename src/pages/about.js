import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ location }) => (
    <Layout>
        <SEO
            title="About"
            description="About description"
            keywords={[`gatsby`, `javascript`, `react`]}
            pathname={location.pathname}
        />

        <section className="">
            <div className="container">
                <h1>This is the about page!</h1>
            </div>
        </section>

    </Layout>
)

export default AboutPage
