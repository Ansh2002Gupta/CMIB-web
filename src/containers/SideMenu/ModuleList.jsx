import React from 'react';

import styles from './sideMenu.module.scss';

const ModuleList = ({ modules, onSelectItem }) => {
    return <ul className={styles.moduleList}>
        {
            modules.map(module => <div key={module.key}>
                <li
                    className={`${styles.moduleListItem} ${module?.subMenu?.length ? styles.disabled : ''} `}
                    key={module.key}
                    onClick={() => !module?.subMenu?.length && onSelectItem(module)}
                >
                    {module.label}
                </li>
                <ul className={styles.moduleSubMenuList} key={'subMenu'}>
                    {module?.subMenu?.map(menu =>
                        <li
                            key={menu.key}
                            className={styles.moduleListItem}
                            onClick={() => onSelectItem(menu, true)}
                        >
                            {menu.label}
                        </li>
                    )}
                </ul>
            </div>)
        }
    </ul>
}

export default ModuleList;