import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from 'gatsby-background-image'
import { graphql } from "gatsby"
import ReactMarkdown from 'react-markdown'

export const query = graphql`
    query($id: String!){
        strapiBlogPosts(id:{eq: $id}){
            id
            Title
            Content
            author{
                id
                username
            }
            Featured{
                childImageSharp{
                    fluid(duotone: {highlight: "#000000", shadow: "#000000", opacity: 35}){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    }
`

const StrapiBlogPost = ({ data, location }) => {

    //Lets set a default image to be used if our post doesn't have one...
    //Otherwise the front end will fail if our graphql query returns Featured as null...
    //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
    let heroImage = <section className="fluid hero t-center" style={{ backgroundColor: '#040e18', }}> <div class="container"><div class="inner">{data.strapiBlogPosts.Title && <h1>{data.strapiBlogPosts.Title}</h1>}</div></div></section >
    if (data.strapiBlogPosts.Featured) {
        heroImage = <BackgroundImage
            Tag="section"
            className={`fluid hero t-center`}
            fluid={data.strapiBlogPosts.Featured.childImageSharp.fluid}
            backgroundColor={`#040e18`}
        >
            <div className="container">
                <div className="inner">
                    {data.strapiBlogPosts.Title && <h1>{data.strapiBlogPosts.Title}</h1>}
                </div>
            </div>
        </BackgroundImage>
    }

    return (
        <Layout>
            <SEO
                title={data.strapiBlogPosts.Title}
                description="Gatsby using Strapi CMS"
                keywords={[`gatsby`, `strapi`, `javascript`, `react`]}
                pathname={location.pathname}
            />

            {heroImage}

            <section className="strapi-post">
                <div className="container">
                    <article>
                        <ReactMarkdown source={data.strapiBlogPosts.Content} />
                    </article>
                </div>
            </section>
        </Layout>
    )

}

export default StrapiBlogPost