import React from "react";
import ProfileSidebar from "./ProfileSidebar.jsx";
import ProfileContent from "./ProfileContent.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setActivate } from "../../redux/reducers/profile.js";

function Profile() {
  const dispatch = useDispatch();
  const activate = useSelector((state) => state.profile.activate);

  return (
    <div className="bg-gray-50 min-h-screen pt-16 md:pt-6 flex-grow">
      <div className="w-full max-w-[1300px] mx-auto flex gap-2 md:gap-4 px-2">
        <aside className="w-[50px] md:w-64 lg:w-72 flex-shrink-0">
          <ProfileSidebar
            activate={activate}
            setActivate={(id) => dispatch(setActivate(id))}
          />
        </aside>

        <main className="flex-1 bg-white rounded-xl shadow p-3 md:p-6 overflow-x-auto min-h-[calc(100vh-160px)]">
          <ProfileContent />
        </main>
      </div>
    </div>
  );
}

export default Profile;
