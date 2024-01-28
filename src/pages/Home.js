import React, { useState } from "react";
// will be replaced by view component injected through route
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import CommonModal from "../components/CommonModal";
// TODO: Need to find out how to work with this below component
// import CropAndRotateImage from "../components/CropAndRotateImage/CropAndRotateImage";
import ModuleChange from "../containers/ModuleChange";
import MainLayout from "../layouts/MainLayout";
import MenuContainer from "../containers/Menu/Menu";
import HeaderContainer from "../containers/Header";
import ModalComponents from "../components/ModalComponents";
import styles from "./CommonStyles/commonModalStyles.module.scss";

function Home({ noOuterPadding }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOpenendModal, setCurrentOpenModal] = useState(0);

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
              {...{
                setCurrentOpenModal,
              }}
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
          <ModalComponents.ViewProfileModal {...{ setCurrentOpenModal }} />
        )}
        {currentOpenendModal === 2 && (
          <ModalComponents.AccessViewModal {...{ setCurrentOpenModal }} />
        )}
        {currentOpenendModal === 3 && (
          <ModalComponents.ChangeProfileModal {...{ setCurrentOpenModal }} />
        )}
      </CommonModal>
      {/* TODO: Need to findout how to use the below commented crop and rotate modal */}
      {/* {currentOpenendModal === 4 && <CropAndRotateImage  {...{
            file,
            handleFileUpload,
            initiateFileUpload,
            photoURL: getImageSource(file),
            setFile,
            setOpenCropView,
          }}/>} */}
    </>
  );
}

export default Home;
