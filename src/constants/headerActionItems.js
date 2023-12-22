import { ReactComponent as UserIcon } from '../themes/base/assets/icons/user.svg';
import { ReactComponent as CompanyIcon } from '../themes//base/assets/icons/building.svg';
import { ReactComponent as LockIcon } from '../themes//base/assets/icons/lock.svg';

const headerActionItems = [
    {
        id: 'label.viewProfile',
        icon: <UserIcon />
    },
    {
        id: 'label.companyProfile',
        icon: <CompanyIcon />
    },
    {
        id: 'label.changePassword',
        icon: <LockIcon />
    },
];

export default headerActionItems;