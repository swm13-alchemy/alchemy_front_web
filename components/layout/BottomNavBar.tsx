import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faChartBar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import {useRouter} from "next/router";

const menuList = [
  { id: '1', name: '밸런스', icon: faChartBar, path: '/balance' },
  { id: '2', name: 'MY', icon: faUser, path: '/' },
  { id: '3', name: '복용관리', icon: faCalendarCheck, path: '/intake-management' },
]

function BottomNavBar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-around absolute bottom-0 left-0 right-0 py-5 bg-white">
      {menuList.map((menu) => {
        return (
          <Link
            key={menu.id}
            href={menu.path}
          >
            <div className={"flex flex-col items-center justify-between cursor-pointer" + (menu.path === router.pathname ? " text-indigo-500" : " text-black")}>
              <FontAwesomeIcon
                icon={menu.icon}
                className="fa-2x"
              />
              <p className="text-sm">{menu.name}</p>
            </div>
          </Link>
        )
      })}
    </nav>
  );
}

export default BottomNavBar;