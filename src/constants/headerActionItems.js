import { ReactComponent as UserIcon } from '../themes/base/assets/icons/user.svg';
import { ReactComponent as LockIcon } from '../themes//base/assets/icons/lock.svg';

const headerActionItems = [
    {
        id: 'label.viewProfile',
        icon: <UserIcon />,
        key: 'viewProfile'
    },
    {
        id: 'label.changePassword',
        icon: <LockIcon />,
        key: 'changePassword'
    },
];

export default headerActionItems;