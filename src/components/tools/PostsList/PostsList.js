//////////////////////////////////////
// The component is a post list with genre tab (Graphql used)
//////////////////////////////////////

import React, { useEffect, useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Container, Row, Col, Nav } from "react-bootstrap"

import "./Postslist.scss"

const PostsList = () => {
  // get other post type by graphql
  const posts = useStaticQuery(graphql`
    {
      studentPosts: allWordpressWpSpost(
        filter: { acf: { genre: { eq: "學生" } } }
        limit: 10
        sort: { fields: date, order: DESC }
      ) {
        edges {
          node {
            title
            wordpress_id
          }
        }
      }
      teacherPosts: allWordpressWpSpost(
        filter: { acf: { genre: { eq: "教師" } } }
        limit: 10
        sort: { fields: date, order: DESC }
      ) {
        edges {
          node {
            title
            wordpress_id
          }
        }
      }

      racePosts: allWordpressWpSpost(
        filter: { acf: { genre: { eq: "競賽" } } }
        limit: 10
        sort: { fields: date, order: DESC }
      ) {
        edges {
          node {
            title
            wordpress_id
          }
        }
      }
      researchPosts: allWordpressWpSpost(
        filter: { acf: { genre: { eq: "講座及課程" } } }
        limit: 10
        sort: { fields: date, order: DESC }
      ) {
        edges {
          node {
            title
            wordpress_id
          }
        }
      }
    }
  `)

  // get latest posts
  const [new_post, setNew_post] = useState([{ title: "loading...", id: 1 }])
  useEffect(() => {
    fetch(
      `https://wordpress.hsnu.org/index.php/wp-json/wp/v2/spost?per_page=10`
    )
      .then(res => res.json())
      .then(data => {
        setNew_post(
          data.map(post => {
            return {
              title: post.title.rendered,
              id: post.id,
            }
          })
        )
      })
  }, [])

  // get top posts
  const [top, setTop] = useState([{ title: "loading...", id: 1 }])
  useEffect(() => {
    fetch(`https://wordpress.hsnu.org/index.php/wp-json/wp/v2/top?per_page=10`)
      .then(res => res.json())
      .then(data => {
        setTop(
          data.map(post => {
            return {
              title: post.title.rendered,
              id: post.id,
            }
          })
        )
      })
  }, [])

  // when toggle tabs
  useEffect(() => {
    // please select the text inside .genre (.genre > h2)
    const genres = document.querySelectorAll(".genre:not(.more) h2")
    for (var i = 0; i < genres.length; i++) {
      genres[i].addEventListener("click", e => {
        // clear all .active
        for (var i = 0; i < genres.length; i++) {
          if (genres[i].classList.contains("active")) {
            genres[i].classList.remove("active")
          }
        }

        e.target.classList.add("active")
      })
    }
  }, [])

  // tabs
  const genreTabs = [
    { name: "最新", codeName: "allPosts" },
    { name: "置頂", codeName: "topPosts" },
    { name: "學生", codeName: "studentPosts" },
    { name: "研習", codeName: "researchPosts" },
    { name: "競賽", codeName: "racePosts" },
    { name: "教師", codeName: "teacherPosts" },
  ]

  const [current_posts, setCurrent_posts] = useState(posts.studentPosts.edges)
  const [genreNow, setGenreNow] = useState("allPosts")

  return (
    <div className={"posts"}>
      {/* genres */}
      <Nav variant="tabs" className={"genres"}>
        {/* run through genres */}
        {genreTabs.map((item, index) => (
          <Nav.Item className={"genre"} key={item.name}>
            <h2
              className={`is-3 bold ${index === 0 ? "active" : null}`}
              onClick={() => {
                setGenreNow(item.codeName)
                if (!["allPosts", "topPosts"].includes(item.codeName)) {
                  setCurrent_posts(posts[item.codeName].edges)
                }
              }}
            >
              {item.name}
            </h2>
          </Nav.Item>
        ))}

        {/* more tab */}
        <Nav.Item className={"genre"}>
          <Link to="/search">
            <h2 className={"is-3 bold more"}>更多...</h2>
          </Link>
        </Nav.Item>
      </Nav>

      {/* List of post */}
      <Container id="post-list">
        <Row className={"flex-column"}>
          {["allPosts", "topPosts"].includes(genreNow)
            ? genreNow === "allPosts"
              ? new_post.map(post => (
                  <Col className={"post"} key={post.id}>
                    <Link to={`/preview?id=${post.id}&post_type=spost`}>
                      <p
                        className={"is-4"}
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                    </Link>
                  </Col>
                ))
              : top.map(post => (
                  <Col className={"post"} key={post.id}>
                    <Link to={`/preview?id=${post.id}&post_type=top`}>
                      <p
                        className={"is-4"}
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                    </Link>
                  </Col>
                ))
            : current_posts.map(post => (
                <Col className={"post"} key={post.node.wordpress_id}>
                  <Link
                    to={`/preview?id=${post.node.wordpress_id}&post_type=spost`}
                  >
                    <p
                      className={"is-4"}
                      dangerouslySetInnerHTML={{ __html: post.node.title }}
                    />
                  </Link>
                </Col>
              ))}
        </Row>
      </Container>
    </div>
  )
}

export default PostsList
