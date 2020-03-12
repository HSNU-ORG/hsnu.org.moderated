import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "gatsby"
import Layout from "../components/layout/Layout"
import axios from "axios"

// style
import "../styles/scss/search/search.scss"

// tools
import Query from "../components/tools/Query/Query"
import Searchbox from "../components/tools/SearchBox/SearchBox"
import Filter from "../components/tools/Filter/Filter"
import SideNews from "../components/tools/SidewNews/SideNews"

export default () => {
  ////////////////////////////////////////////////
  //    when scroll near the bottom, add news   //
  ////////////////////////////////////////////////
  const [newses, setNewses] = useState(null)
  const [page_now, setPage_now] = useState(1)

  // first render
  useEffect(() => {
    axios
      .get(
        `https://anmicius.cnmc.tw/index.php/wp-json/wp/v2/news?per_page=20&page=1`
      )
      .then(res => {
        console.log(res.data)
        setPage_now(page_now + 1)
        setNewses(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // load when hit the (1/2) bottom
  useEffect(() => {
    window.onscroll = function() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight / 2
      ) {
        axios
          .get(
            `https://anmicius.cnmc.tw/index.php/wp-json/wp/v2/news?per_page=20&page=${page_now}`
          )
          .then(res => {
            console.log(res.data)
            setPage_now(page_now + 1)
            setNewses(newses.concat(res.data))
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }, [newses])
  ///////////////
  //    End   ///
  ///////////////

  //////////////
  //  search  //
  //////////////
  const [results, setResults] = useState([])

  // get search paramaters
  var search_param = new URL(document.URL).searchParams.get("search")
  var genre_param = new URL(document.URL).searchParams.get("genre")
  var subgenre_param = new URL(document.URL).searchParams.get("subgenre")

  // request wordpress api
  useEffect(() => {
    axios
      .get(
        `https://anmicius.cnmc.tw/index.php/wp-json/wp/v2/spost?${
          search_param ? "search=" + search_param : ""
        }${
          genre_param
            ? "filter[meta_query][0][key]=genre&filter[meta_query][0][value]=" +
              genre_param
            : ""
        }${
          subgenre_param
            ? "filter[meta_query][1][key]=sub_genre_student&filter[meta_query][1][value]=" +
              subgenre_param
            : ""
        }
      `
      )
      .then(res => {
        console.log(res.data)
        setResults(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  ///////////////
  //    End   ///
  ///////////////

  return (
    <Layout>
      <div id="header-padding" />
      <Container id="search-page" fluid>
        <Row>
          <Col lg="7">
            <Searchbox showFilter />
            {results.length ? (
              <Query results={results} />
            ) : (
              <Container fluid id="search-result-container">
                <Row>
                  <Col className={"search-result"}>
                    <Link>
                      {/* title */}
                      <h3 className={"is-3 bold"}>No result found</h3>
                    </Link>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
          <Col lg={{ span: 4, offset: 1 }}>
            <Filter id="search-page-filter" />
            {newses ? <SideNews newses={newses} /> : null}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
