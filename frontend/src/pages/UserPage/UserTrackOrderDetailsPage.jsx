import React from 'react'
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import TrackOrder from '../../components/User/UserOrderDetails/UserTrakOrderDetails.jsx'
function UserTrackOrderDetailsPage() {
  return (
    <div>
        <Header />
        <TrackOrder/>
        <Footer/>
    </div>
  )
}

export default UserTrackOrderDetailsPage