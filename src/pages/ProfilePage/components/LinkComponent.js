import { EmptyLink, LinkIcon } from "assets/icons";
import { EditableCard, EmptyCard } from "components/card";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TItleText = styled.div`
  text-align: center;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 22px;
  display: grid;
  gap: 20px;
`;

const LinkComponent = ({ userLinkList, profileDecorate }) => {
  const [linkList, setLinkList] = useState(userLinkList);
  const { t } = useTranslation();

  useEffect(() => {
    setLinkList(userLinkList);
  }, [userLinkList]);

  const linkOnClick = (idx) => {
    window.location.href = linkList[idx].linkUrl;
  };

  return (
    <FullContainer>
      <TitleContainer>
        <TItleText style={{ color: profileDecorate.fontColor }}>
          {t("manageProfilePage1")}
        </TItleText>
      </TitleContainer>
      {linkList?.length == 0 ? (
        <>
          <EmptyCard icon={EmptyLink} text={t("selectWalletPage3_4")} />
        </>
      ) : (
        <ListContainer>
          {linkList?.map((link, idx) => (
            <EditableCard
              label={link.linkTitle}
              icon={LinkIcon}
              onClick={() => linkOnClick(idx)}
              style={{
                backgroundColor: profileDecorate.buttonColor,
                color: profileDecorate.buttonFontColor,
              }}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default LinkComponent;
