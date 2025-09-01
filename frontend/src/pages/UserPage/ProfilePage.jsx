// ProfilePage.js
import React from "react";
import Profile from "../../components/Profile/Profile.jsx";
import Header from "../../components/Layout/Header/Header.jsx";
import Footer from "../../components/Layout/Footer/Footer.jsx";

function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-2 sm:pt-4 md:pt-6"> {/* Reduced top padding to move content up */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 sm:py-8 lg:px-8"> {/* Reduced vertical padding */}
          <Profile />
        </div>
      </main>
      <Footer className="mt-auto py-2 md:py-4" />
    </div>
  );
}

export default ProfilePage;