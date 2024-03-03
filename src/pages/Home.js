import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import CommonModal from "../components/CommonModal";
import EditProfile from "../containers/EditProfile";
import ModuleChange from "../containers/ModuleChange";
import MainLayout from "../layouts/MainLayout";
import MenuContainer from "../containers/Menu/Menu";
import HeaderContainer from "../containers/Header";
import ViewProfileDetails from "../containers/ViewProfileDetails";
import useShowNotification from "../core/hooks/useShowNotification";
import { urlService } from "../Utils/urlService";
import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import { USER_PROFILE_QUERY_PARAMS } from "../constant/constant";
import styles from "./CommonStyles/commonModalStyles.module.scss";

function Home() {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfileDetails] = useContext(UserProfileContext);
  const userModalParams =
    urlService.getQueryStringValue(USER_PROFILE_QUERY_PARAMS) === "open";
  const { showNotification, notificationContextHolder } = useShowNotification();
  const currentlyOpenedUserProfileModal = userModalParams
    ? userProfileDetails?.currentlyOpenedUserProfileModal || 1
    : 0;

  useEffect(() => {
    if (
      !userModalParams &&
      urlService.getQueryStringValue(USER_PROFILE_QUERY_PARAMS)
    ) {
      urlService.removeParam(USER_PROFILE_QUERY_PARAMS);
    }
  }, []);

  return (
    <>
      {notificationContextHolder}
      <MainLayout
        menu={
          <MenuContainer
            {...{ openSideMenu, setIsModalOpen, setOpenSideMenu }}
          />
        }
        header={
          <Layout
            style={{
              background: "white",
              padding: "12px",
            }}
          >
            <HeaderContainer
              openSideMenu={openSideMenu}
              setOpenSideMenu={setOpenSideMenu}
            />
          </Layout>
        }
        content={<Outlet />} // view component
      />
      <CommonModal isOpen={isModalOpen} width={600}>
        <ModuleChange {...{ setIsModalOpen }} />
      </CommonModal>
      {!!currentlyOpenedUserProfileModal &&
        currentlyOpenedUserProfileModal < 4 && (
          <CommonModal
            isOpen={
              currentlyOpenedUserProfileModal &&
              currentlyOpenedUserProfileModal < 4
            }
            width={600}
            customContainerStyles={styles.customContainerStyles}
          >
            {currentlyOpenedUserProfileModal === 1 && (
              <ViewProfileDetails
                {...{
                  showNotification,
                }}
              />
            )}
            {currentlyOpenedUserProfileModal !== 1 && (
              <EditProfile
                {...{
                  showNotification,
                }}
              />
            )}
          </CommonModal>
        )}
    </>
  );
}

export default Home;
