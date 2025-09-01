import React from 'react'
import SellerDashBoardHeader from '../../components/Seller/Layout/SellerDashBoard/DashboardHeader/DashboardHeader.jsx'
import SellerDashBoardSideBar from '../../components/Seller/Layout/SellerDashBoard/DashboardSideBar/DashboardSideBar.jsx'
import  DashBoardHero from '../../components/Seller/Layout/SellerDashBoard/DashboardHero/DashboardHero.jsx'
function SellerDashBoardPage() {
  return (
    <div>
        <SellerDashBoardHeader/>
        <div className='flex items-start justify-between px-4 py-2 bg-gray-100 w-full'>
          <div className='lg:w-[270px] md:w-[250px] w-[100px]'>
            <SellerDashBoardSideBar active={1}/>
          </div>
          <DashBoardHero/>
        </div>
    </div>
  )
}

export default SellerDashBoardPage