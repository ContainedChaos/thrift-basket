import React from "react"

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="flex-row">
            <i className="fa fa-phone"></i>
            <label>+88012 3457 7894</label>
            <i className="fa fa-envelope"></i>
            <label>example@gmail.com</label>
          </div>
          <div className="flex-row">
            <label>Theme FAQ's</label>
            <label>Need Help</label>
            <span></span>
            <label htmlFor="">EN</label>
            <span></span>
            <label htmlFor="">USD</label>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head