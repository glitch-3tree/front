import { ProfileCard } from "components/card";
import { SettingProfileHeader } from "components/header";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getUserInfo } from "utils/api/auth";
import {
  AddLinkModal,
  CustomizeMyInfo,
  EditMyInfo,
  LinkComponent,
  WalletComponent,
} from "./components";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 75px;
`;

const EditProfilePage = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [editMyInfo, setEditMyInfo] = useState();
  const [customizeMyInfo, setCustomizeMyInfo] = useState(false);
  const [infoChange, setInfoChange] = useState(false);
  const { t } = useTranslation();

  const getUserInfoData = async () => {
    await getUserInfo().then((data) => {
      setUserInfo(data);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserInfoData();
    } else {
      alert(t("introPageAlert1"));
      window.location.href = "/";
    }
  }, [infoChange]);

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const editOnClick = () => {
    setEditMyInfo(true);
  };

  const customizeOnClick = () => {
    setCustomizeMyInfo(true);
  };

  return (
    <>
      {userInfo && !editMyInfo && !customizeMyInfo && (
        <FullContainer>
          <SettingProfileHeader
            userId={userInfo.userId}
            title={t("manageProfilePageHeader")}
          />
          {loginModalVisible && (
            <AddLinkModal
              visible={loginModalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeLoginModal}
            />
          )}
          <ProfileCard
            profileImg={userInfo.profileImg}
            userName={userInfo.profileName}
            introduction={userInfo.profileBio}
            onClick={editOnClick}
            onClickRight={customizeOnClick}
            isEditable={true}
          />
          <LinkComponent
            userId={userInfo.userId}
            setInfoChange={setInfoChange}
            infoChange={infoChange}
          />
          <WalletComponent
            userId={userInfo.userId}
            setInfoChange={setInfoChange}
            infoChange={infoChange}
          />
        </FullContainer>
      )}
      {editMyInfo && (
        <EditMyInfo
          userInfo={userInfo}
          setEditMyInfo={setEditMyInfo}
          setInfoChange={setInfoChange}
          infoChange={infoChange}
        />
      )}
      {customizeMyInfo && (
        <CustomizeMyInfo
          userId={userInfo.userId}
          setCustomizeMyInfo={setCustomizeMyInfo}
          setInfoChange={setInfoChange}
          infoChange={infoChange}
        />
      )}
    </>
  );
};

export default EditProfilePage;
