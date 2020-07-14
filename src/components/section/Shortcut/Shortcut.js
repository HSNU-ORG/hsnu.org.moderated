import React, { useEffect, useState } from "react"
import { Container, Row, Col, ListGroup } from "react-bootstrap"

import "./Shortcut.scss"

export default () => {
  // fetch data from wordpress
  const [blocks, setBlocks] = useState()
  useEffect(() => {
    fetch("https://wordpress.hsnu.org/index.php/wp-json/wp/v2/menu?per_page=1")
      .then(res => {
        return res.json()
      })
      .then(data => {
        setBlocks(data[0].acf.block.slice(0, 4))
      })
  }, [])

  return (
    <Container as="section" id="Shortcut" fluid>
      <Row>
        {blocks
          ? blocks.map(block => (
              <Col lg="3">
                <h2 className={"is-2 bold"}>
                  <span>{block.title}</span>
                </h2>
                <ListGroup as="ul">
                  {block.item.slice(0, 5).map(item => (
                    <ListGroup.Item as="li">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"is-4"}
                      >
                        {item.title}
                      </a>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item as="li">
                    <a
                      className={"is-4"}
                      onClick={() => {
                        const sidebar = document.querySelector("#sidebar")
                        const overlay = document.querySelector(
                          "#sidebar-overlay"
                        )
                        sidebar.classList.toggle("active")
                        overlay.classList.toggle("active")
                      }}
                    >
                      更多...
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  )
}
