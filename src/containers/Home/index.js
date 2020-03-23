import React from 'react'
import { Link } from 'react-router-dom'


export default () => (
  <div className="has-text-centered">
    <section class="hero is-info">
      <div className="container">
        <Link to='/projects'>Hello</Link>
        <h1 className="title">Home Page</h1>
        <h2 className="page-title">ทำ Routing ให้กับ React ด้วย React Router v4</h2>
        <p className="button button-large is-primary"><a href="https://devahoy.com/posts/basic-web-with-react-router-v4/" target="_blank">อ่านบทความ</a></p>
      </div>
    </section>
  </div>
)
