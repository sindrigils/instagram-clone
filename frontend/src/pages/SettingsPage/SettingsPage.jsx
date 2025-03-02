import { useState } from "react";

import styles from "./SettingsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Item from "../../components/Item/Item";
import EditProfileSvg from "../../assets/svgs/EditProfileSvg";
import ChangeNameSvg from "../../assets/svgs/ChangeNameSvg";
import ChangeUsernameSvg from "../../assets/svgs/ChangeUsernameSvg";
import ChangePasswordSvg from "../../assets/svgs/ChangePasswordSvg";
import ResetPasswordSvg from "../../assets/svgs/ResetPasswordSvg";

import EditProfile from "../../components/EditProfile/EditProfile";

const options = {
  "Edit profile": {
    svg: <EditProfileSvg />,
    component: <EditProfile />,
  },
  "Change name": { svg: <ChangeNameSvg />, component: null },
  "Change password": { svg: <ChangePasswordSvg />, component: null },
};

function SettingsPage() {
  const [selectedItem, setSelectedItem] = useState("Edit profile");
  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>
        <Sidebar />
      </div>
      <div className={styles.settings}>
        <div className={styles.settingsHeader}>Settings</div>
        <span>
          {Object.entries(options).map(([text, { svg }], idx) => (
            <Item
              key={idx}
              text={text}
              svg={svg}
              onClick={setSelectedItem}
              selected={text === selectedItem}
            />
          ))}
        </span>
      </div>

      <div className={styles.content}>{options[selectedItem]["component"]}</div>
    </div>
  );
}

export default SettingsPage;
