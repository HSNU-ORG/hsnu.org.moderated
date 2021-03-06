///////////////////////////////////////////////////////////
//
// The section use to show case the content from student. (Graphql used)
//
// The censored attribute in graphql query indicate how seveare the censorship should be.
// 1: The cover and the content is all about school.
// 2: The content is about school.
// 3: It's not about school. (Will be showed only in hsnu.org)
///////////////////////////////////////////////////////////

import React from "react"
import { Jumbotron } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"

// style
import "./Landing.scss"

export const LandingPure = ({ headline }) => {
  return (
    <>
      <Jumbotron className="landing" fluid>
        <img
          rel="preload"
          src={headline.node.acf.image.sizes.wordpress_1536x1536}
          alt={"Headline"}
        ></img>
        <div className={"fade-layer"}></div>
        <a
          href={headline.node.acf.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className={"is-1 serif bold"}>
            <span className={"is-3"}>附中學生作品｜</span>
            <br />
            {headline.node.title}
          </h1>
        </a>
      </Jumbotron>
    </>
  )
}
const Landing = () => {
  const headline = useStaticQuery(graphql`
    {
      allWordpressWpNews(
        limit: 1
        sort: { fields: date, order: DESC }
        filter: { acf: { censored: { eq: "1" } } }
      ) {
        edges {
          node {
            title
            acf {
              image {
                sizes {
                  wordpress_1536x1536
                }
              }
              link
            }
          }
        }
      }
    }
  `).allWordpressWpNews.edges[0]

  return <LandingPure headline={headline} />
}

export default Landing
