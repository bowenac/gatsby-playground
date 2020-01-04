import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ location }) => {
    return (
        <Layout>
            <SEO
                title="Home"
                description="Home description"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
                image="/images/DSC00091.JPG"
                pathname={location.pathname}
            />
            <h1>Hi people</h1>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
        </Layout>
    )
}

export default IndexPage
