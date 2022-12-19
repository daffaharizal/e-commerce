import { FC, useRef, useState } from 'react';

import { AiOutlineHome, AiOutlineLock } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { GoThreeBars } from 'react-icons/go';
import {
  MdExpandLess,
  MdExpandMore,
  MdFavoriteBorder,
  MdOutlineAddBox,
  MdOutlineInventory2,
  MdOutlinePersonOutline
} from 'react-icons/md';

import styles from 'assets/css/AdminSidebar.module.css';

const menuItems = [
  {
    name: 'Home',
    // icon: 'home'
    icon: <AiOutlineHome size={26} />
  },
  {
    name: 'Settings',
    // icon: 'settings',
    icon: <FiSettings size={26} />,
    items: ['Display', 'Editor', 'Theme', 'Interface']
  },
  {
    name: 'Create',
    // icon: 'add_box'
    icon: <MdOutlineAddBox size={26} />,
    items: ['Article', 'Document', 'Report']
  },
  {
    name: 'Account',
    // icon: 'lock',
    icon: <AiOutlineLock size={26} />,
    items: ['Dashboard', 'Logout']
  },
  {
    name: 'Products',
    // icon: 'inventory_2'
    icon: <MdOutlineInventory2 size={26} />
  },
  {
    name: 'Favourites',
    // icon: 'favorite'
    icon: <MdFavoriteBorder size={26} />
  },
  {
    name: 'Search',
    // icon: 'search'
    icon: <BiSearchAlt2 size={26} />
  },
  {
    name: 'Users',
    // icon: 'person'
    icon: <MdOutlinePersonOutline size={26} />
  }
];

type Item = {
  name: string;
  icon: React.ReactElement;
  items: string[];
};

const NavHeader = () => (
  <header className={styles['sidebar-header']}>
    <button type="button">
      <GoThreeBars size={50} />
    </button>
    <span>Admin</span>
  </header>
);

type ButtonProps = {
  onClick: (item: string) => void;
  name: string;
  icon?: React.ReactElement;
  isActive: boolean;
  hasSubNav?: boolean;
};

const NavButton: FC<ButtonProps> = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav
}) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? styles['active'] : ''}>
    {icon}
    <span>{name}</span>
    {hasSubNav && isActive && <MdExpandLess size={24} />}
    {hasSubNav && !isActive && <MdExpandMore size={24} />}
  </button>
);
type SubMenuProps = {
  item: Item;
  activeItem: string;
  handleClick: (args0: string) => void;
};

const SubMenu: FC<SubMenuProps> = ({ item, activeItem, handleClick }) => {
  const navRef = useRef<HTMLDivElement>(null);

  const isSubNavOpen = (item: string, items: string[]) =>
    items.includes(activeItem) || item === activeItem;

  return (
    <div
      className={`${styles['sub-nav']} ${
        isSubNavOpen(item.name, item.items) ? styles['open'] : ''
      }`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight
      }}>
      <div ref={navRef} className={styles['sub-nav-inner']}>
        {item?.items.map((subItem) => (
          <NavButton
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

export const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState<string>('');

  const handleClick = (item: string) => {
    setActiveItem(item !== activeItem ? item : '');
  };

  return (
    <aside className={styles['sidebar']}>
      <NavHeader />
      {menuItems.map((item) => (
        <>
          {!item.items && (
            <NavButton
              onClick={handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
            <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
            </>
          )}
        </>
      ))}
    </aside>
  );
};
export default AdminSidebar;
