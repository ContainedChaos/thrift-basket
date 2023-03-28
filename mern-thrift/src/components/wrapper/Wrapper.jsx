import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: "Eco-friendly",
      decs: "Helps us reduce waste and save the environment.",
    },
    {
      cover: <i class='fa-solid fa-id-card'></i>,
      title: "Safe Payment",
      decs: "Using trusted and secure payment platforms is crucial to protect personal and financial information when making online purchases.",
    },
    {
      cover: <i class='fa-solid fa-shield'></i>,
      title: "Shop With Confidence ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <i class='fa-solid fa-headset'></i>,
      title: "Affordable choices",
      decs: "Prices so cheap, there's something for everyone.",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper