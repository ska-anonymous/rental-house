import React from 'react'

const Footer = () => {
  return (
    <section className="container-fluid footer_section ">
    <div className="container">
      <p>
        &copy; <span>{new Date().getFullYear()}</span> All Rights Reserved By <b>House Rental</b>
      </p>
    </div>
  </section>
  )
}

export default Footer
