import React from "react";
import { useSelector } from "react-redux";
import ContentProfile from "../Profile/Content/ContentProfile.jsx";
import ContentOrders from "../Profile/Content/ContentOrders.jsx";
import ContentRefunds from "../Profile/Content/ContentRefunds.jsx";
import ContentTrackOrders from "../Profile/Content/ContentTrackOrders.jsx";
import ContentAddress from "../Profile/Content/ContentAddress.jsx";
import ContentChangePassword from "../Profile/Content/ContentChangePassword.jsx";
import ContentInbox from "../Profile/Content/ContentInbox.jsx";
function ProfileContent() {
  const activate = useSelector((state) => state.profile.activate);

  return (
    <div className="w-full">
      {activate === 1 ? (
        <ContentProfile />
      ) : activate === 2 ? (
        <ContentOrders />
      ) : activate === 3 ? (
        <ContentRefunds />
      ) : activate === 4 ? (
        <div>
          <ContentInbox />
        </div>
      ) : activate === 5 ? (
        <ContentTrackOrders />
      ) : activate === 6 ? (
        <ContentChangePassword />
      ) : activate === 7 ? (
        <ContentAddress />
      ) : null}
    </div>
  );
}

export default ProfileContent;
