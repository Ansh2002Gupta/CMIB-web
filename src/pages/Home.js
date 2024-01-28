import React, { useState } from "react";
// will be replaced by view component injected through route
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import CommonModal from "../components/CommonModal";
import ModuleChange from "../containers/ModuleChange";
import MainLayout from "../layouts/MainLayout";
import MenuContainer from "../containers/Menu/Menu";
import HeaderContainer from "../containers/Header";
import ModalComponents from "../components/ModalComponents";
import styles from "./CommonStyles/commonModalStyles.module.scss";

function Home({ noOuterPadding }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOpenendModal, setCurrentOpenModal] = useState(1);

  return (
    <>
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
        {...{ noOuterPadding }}
      />
      <CommonModal isOpen={isModalOpen} width={600}>
        <ModuleChange {...{ setIsModalOpen }} />
      </CommonModal>
      <CommonModal
        isOpen={currentOpenendModal}
        width={600}
        customContainerStyles={styles.customContainerStyles}
      >
        {currentOpenendModal === 1 && (
          <ModalComponents.ViewProfileModal
            {...{  setCurrentOpenModal }}
          />
        )}
        {currentOpenendModal === 2 && (
          <ModalComponents.LogoutModal
            {...{  setCurrentOpenModal }}
          />
        )}
        {currentOpenendModal === 3 && (
          <ModalComponents.ChangeProfileModal
            {...{  setCurrentOpenModal }}
          />
        )}
      </CommonModal>
    </>
  );
}

export default Home;
