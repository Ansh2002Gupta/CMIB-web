import { ReactComponent as UserIcon } from '../themes/base/assets/icons/user.svg';
import { ReactComponent as LockIcon } from '../themes//base/assets/icons/lock.svg';

const headerActionItems = [
    {
        id: 'label.myProfile',
        icon: <UserIcon />,
        key: 'myProfile'
    },
    {
        id: 'label.changePassword',
        icon: <LockIcon />,
        key: 'changePassword'
    },
];

export default headerActionItems;