import React from "react"
import Layout from "../components/layout"
import Hero from "../components/hero"
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

            <Hero
                imgName="DSC01284.JPG"
                heading="Hero Heading"
                subHeading="This is the sub heading"
                content="Cool sentences could go here."
                align="center"
                internalLink="/about"
                externalLink="https://www.gatsbyjs.org/"
                ctaText="Learn More"
                textPosition="center"
            />

            <section className="">
                <div className="container">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid omnis voluptatum quibusdam fuga nam adipisci ratione molestiae optio, illo maxime officiis suscipit rem, repellendus explicabo rerum minus quae, exercitationem alias.</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repudiandae qui totam nisi, fugiat sapiente laboriosam accusamus distinctio, hic obcaecati tempora. Ab harum consequuntur numquam laudantium, aliquid voluptas totam doloremque!Quia provident sequi illum, odio distinctio quae, quam dolores blanditiis unde consequatur eum earum aliquid? Minima possimus magni, esse distinctio vero labore inventore dicta ducimus minus corrupti beatae ipsum hic?</p>
                </div>
            </section>

            <section className="">
                <div className="container">
                    <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
                        <h2>Default Section</h2>
                        <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                    </div>
                </div>
            </section>

            <section className="full">
                <div className="container">
                    <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
                        <h2>Full Section</h2>
                        <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                    </div>
                </div>
            </section>

            <section className="fluid">
                <div className="container">
                    <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
                        <h2>Fluid Section</h2>
                        <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                    </div>
                </div>
            </section>

            <section className="full">
                <div className="container">
                    <h2>Full Section with Columns</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
                                <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
                                <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div style={{ maxWidth: `100%`, marginBottom: `1.45rem` }}>
                                <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="fluid">
                <div className="container">
                    <h2>Fluid Section with Two Columns</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-6">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-6">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-6">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-6">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="fluid">
                <div className="container">
                    <h2>Fluid Section with Three Columns</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-4">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-4">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-4">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-4">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                        <div className="col-md-4">
                            <Image imgName="DSC00091.JPG" alt="Wood Texture" />
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default IndexPage
