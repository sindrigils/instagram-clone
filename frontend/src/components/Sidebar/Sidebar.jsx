import { Link } from "react-router-dom";

import styles from "./Sidebar.module.css";
import Item from "../Item/Item";

import HomeSvg from "../../assets/svgs/HomeSvg";
import SearchSvg from "../../assets/svgs/SearchSvg";
import ExploreSvg from "../../assets/svgs/ExploreSvg";
import ReelsSvg from "../../assets/svgs/ReelsSvg";
import MessageSvg from "../../assets/svgs/MessageSvg";
import HeartSvg from "../../assets/svgs/HeartSvg";
import CreateSvg from "../../assets/svgs/CreateSvg";
import MenuSvg from "../../assets/svgs/MenuSvg";
import { useSelector } from "react-redux";

const items = {
  Home: { svg: <HomeSvg />, link: "/" },
  Search: { svg: <SearchSvg />, link: "/" },
  Explore: { svg: <ExploreSvg />, link: "/" },
  Reels: { svg: <ReelsSvg />, link: "/" },
  Messages: { svg: <MessageSvg />, link: "/" },
  Notifications: { svg: <HeartSvg />, link: "/" },
  Create: { svg: <CreateSvg />, link: "/" },
};

function Sidebar() {
  const { profilePic, username } = useSelector((state) => state.user);
  items["Profile"] = { svg: profilePic, link: `/${username}` };

  return (
    <div className={styles.sidebarContainer}>
      <div>
        <div className={styles.header}>
          <span>
            <Link className={styles.link} to="/">
              Instagram
            </Link>
          </span>
        </div>
        {Object.entries(items).map(([text, { svg, link }], idx) => (
          <Item key={idx} text={text} svg={svg} link={link} />
        ))}
      </div>
      <div className={styles.footerIcons}>
        <Item text={"Threads"} svg={<HomeSvg />} />
        <Item text={"More"} svg={<MenuSvg />} />
      </div>
    </div>
  );
}

export default Sidebar;
