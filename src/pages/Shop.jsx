import React from 'react'
import Filter from './Filter'
import Featured from './Featured'

export default function Shop() {
  return (
    <div className="headerbt">
        <div className="container-fluid px-5">
        <div className="banner-crumb">
            <img src="https://fashion.minimog.co/cdn/shop/files/collection-banner-section.jpg?v=1709194155&width=2000" alt="" />
            <div className="categorie-banner">
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Sunglasses
        </li>
      </ol>
    </nav>
    <h4>Sunglasses</h4>
    <p>Here is your chance to upgrade your wardrobe <br />
with a variation of styles and fits that are both feminine and relaxed.</p>
</div>
        </div>
      <div className="categoury-fields">
         <div className='first-fil'><Filter/> </div>
         <div className='second-fil'><Featured/></div>
      </div>
          </div>
    </div>
  )
}
