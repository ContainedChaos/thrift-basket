import React from "react"
import Navbar from "../../common/header/Navbar"
import Categories from "./Categories"
import "./Home.css"
import SlideCard from "./SlideCard"
import SliderHome from "./Slider"

const Home = ({CartItem }) => {
  return (
    <>
    <Navbar CartItem={CartItem}/>
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