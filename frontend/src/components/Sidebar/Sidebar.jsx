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
  Home: <HomeSvg />,
  Search: <SearchSvg />,
  Explore: <ExploreSvg />,
  Reels: <ReelsSvg />,
  Messages: <MessageSvg />,
  Notifications: <HeartSvg />,
  Create: <CreateSvg />,
};

function Sidebar() {
  const { profilePic } = useSelector((state) => state.user);
  items["Profile"] = profilePic;

  return (
    <div className={styles.sidebar_container}>
      <div>
        <div className={styles.header}>
          <span>
            <Link className={styles.link} to="/">
              Instagram
            </Link>
          </span>
        </div>
        {Object.entries(items).map(([text, svg], idx) => (
          <Item key={idx} text={text} svg={svg} />
        ))}
      </div>
      <div className={styles.footer_icons}>
        <Item text={"Threads"} svg={<HomeSvg />} />
        <Item text={"More"} svg={<MenuSvg />} />
      </div>
    </div>
  );
}

export default Sidebar;
