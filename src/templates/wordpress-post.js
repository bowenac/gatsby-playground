import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from 'gatsby-background-image'
import { graphql } from "gatsby"

export const query = graphql`
    query($id: String!){
        wordpressPost(id: {eq: $id}) {
            title
            content
            featured_media {
                alt_text
                localFile {
                    childImageSharp {
                        fluid(duotone: {highlight: "#000000", shadow: "#000000", opacity: 35}){
                            ...GatsbyImageSharpFluid_withWebp
                            src
                        }
                    }
                }
            }
            date(formatString: "MMM DD, Y")
        }
    }
`

const WordPressBlogPost = ({ data, location }) => {

    //Lets set a default image to be used if our post doesn't have one...
    //Otherwise the front end will fail if our graphql query returns Featured as null...
    //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
    let heroImage = <section className="fluid hero t-center" style={{ backgroundColor: '#040e18', }}> <div class="container"><div class="inner">{data.wordpressPost.title && <h1>{data.wordpressPost.title}</h1>}</div></div></section >
    if (data.wordpressPost.featured_media) {
        heroImage = <BackgroundImage
            Tag="section"
            className={`fluid hero t-center`}
            fluid={data.wordpressPost.featured_media.localFile.childImageSharp.fluid}
            backgroundColor={`#040e18`}
        >
            <div className="container">
                <div className="inner">
                    {data.wordpressPost.title && <h1>{data.wordpressPost.title}</h1>}
                </div>
            </div>
        </BackgroundImage>
    }

    return (
        <Layout>
            <SEO
                title={data.wordpressPost.title}
                description="Gatsby using Strapi CMS"
                keywords={[`gatsby`, `strapi`, `javascript`, `react`]}
                pathname={location.pathname}
            />

            {heroImage}

            <section className="strapi-post">
                <div className="container">
                    <article>
                        <div dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}></div>
                    </article>
                </div>
            </section>
        </Layout>
    )

}

export default WordPressBlogPost