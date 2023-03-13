import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SlideCard from "./SlideCard"
import SliderHome from "./Slider"

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />
          <SliderHome/>
        </div>
      </section>
    </>
  )
}

export default Home