import React, { useState } from "react";
import { Button, ConfigProvider, Layout, Menu, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import TwoRow from "../../core/layouts/TwoRow";
import TwoColumn from "../../core/layouts/TwoColumn";

import {
  CONFIGURATIONS,
  DASHBOARD,
  SUBSCRIPTIONS,
} from "../../routes/routeNames";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import styles from "./sideMenu.module.scss";
import { DownOutlined, UpOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const modules = [
  {
    label: 'Control',
    key: 'control',
    children: [
      { label: 'Users', key: 'users', icon: <UserOutlined /> },
      { label: 'Notifications', key: 'notifications', icon: <UserOutlined /> },
      { label: 'Contact Us', key: 'contactUs', icon: <UserOutlined /> },
      { label: 'Feedback', key: 'feedback', icon: <UserOutlined /> },
      { label: 'Testimonials', key: 'testimonials', icon: <UserOutlined /> },
      { label: 'Registered Companies', key: 'registerCompanies', icon: <UserOutlined /> },
      { label: 'Activity Logs', key: 'activityLogs', icon: <UserOutlined /> },
    ]
  },
  {
    label: 'Newly Qualified Placements',
    key: 'newlyQualifiedPlacements'
  },
  {
    label: 'CA Jobs',
    key: 'caJobs'
  },
  {
    label: 'Experienced Members',
    key: 'experiencedMembers',
    subMenu: [
      { key: 'careerAscent', label: 'Career Ascent' },
      { key: 'womenPartTime', label: 'Women PartTime' },
      { key: 'overseasChapters', label: 'Overseas Chapters' },
    ]
  },

  // Add more modules as needed
];
const ModuleList = ({ modules, onSelectItem }) => {
  return <ul className={styles.moduleList}>
    {
      modules.map(module =>
        <li
          className={styles.moduleListItem}
          key={module.key}
          onClick={() => onSelectItem(module)}
        >
          {module.label}
        </li>
      )}
  </ul>
}
const SideMenu = ({logo}) => {
  const { navigateScreen: navigate } = useNavigateScreen();
  const [openModuleSelector, setOpenModuleSelector] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const handleOnSelectItem = (item) => {
    setSelectedModule(item);
    setOpenModuleSelector(false)
  };

  return (
  
  <>

    <div className={styles.appLogo}>
      {logo}
    </div>
    <TwoRow
      topSection={(
        <TwoColumn
          className={styles.moduleSelector}
          leftSection={(
            <div
              className={openModuleSelector ? '' : styles.moduleSelectorHeading}
            >
              {openModuleSelector ? 'Choose a module' : selectedModule.label}
            </div>
          )}

          rightSection={(
            <Button
              size="small"
              shape="round"
              type="text"
              style={{
                color: '#fff',
                background: '#262d52',
                fontSize: '12px'
              }}
              onClick={() => setOpenModuleSelector(prev => !prev)}
            >
              {openModuleSelector ? <UpOutlined /> : 'Change'}
            </Button>
          )}
        />
      )}
      bottomSection={(
        openModuleSelector && <ModuleList modules={modules} onSelectItem={handleOnSelectItem} />
      )}
    />
      
    {
      !openModuleSelector && selectedModule &&
      <Menu
        className={styles.sideMenuOptionsContainer}
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={selectedModule.children}
        expandIcon={<></>}
        openKeys={modules.map(module => module.key)}
      />
    }
  </>


  );
};

export default SideMenu;
