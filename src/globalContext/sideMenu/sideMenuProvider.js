import { createContext, useReducer } from 'react';
import * as types from './types';
import { UserOutlined } from '@ant-design/icons';

// TODO: need to add icons according to module
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

const initialState = {
  selectedModule: 1,
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case types.SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export const DashboardContext = createContext(initialState);

export const DashboardProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useReducer(
    dashboardReducer,
    initialState
  );

  return (
    <DashboardContext.Provider value={[dashboardState, dashboardDispatch]}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
