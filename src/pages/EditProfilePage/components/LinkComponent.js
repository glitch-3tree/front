import { EmptyLink, LinkIcon } from "assets/icons";
import { ContainedButton } from "components/button";
import { EditableCard, EmptyCard } from "components/card";
import { DeleteModal } from "components/modal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { addLink, deleteLink, editLink, getLink } from "utils/api/link";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import AddLinkModal from "./AddLinkModal";

const FullContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TItleText = styled.div`
  text-align: left;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 40px;
  display: grid;
  gap: 20px;
`;

const LinkComponent = ({ userId, setInfoChange, infoChange }) => {
  const [linkList, setLinkList] = useState(userId?.links);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [editIdx, setEditIdx] = useState(-1);
  const [linkModalOn, setLinkModalOn] = useState(false);
  const [editLinkModalOn, setEditLinkModalOn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getLink(userId).then((data) => {
      setLinkList(data);
    });
  }, [infoChange]);

  useEffect(() => {
    (async () => {
      if (realDelete) {
        await deleteLink(linkList[deleteIdx].id).then(() => {
          setInfoChange(!infoChange);
        });
        setDeleteIdx(-1);
        setRealDelete(false);
      }
    })();
  }, [realDelete]);

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  const closeLinkModal = () => {
    setLinkModalOn(false);
  };

  const addLinkOnClick = () => {
    setLinkModalOn(true);
  };

  const editOnClick = (idx) => {
    setEditIdx(idx);
    setEditLinkModalOn(true);
  };

  const closeEditLinkModal = () => {
    setEditLinkModalOn(false);
  };

  const editAction = async ({ linkId, title, url }) => {
    await editLink(linkId, title, url).then(() => {
      setInfoChange(!infoChange);
      setEditIdx(-1);
    });
  };

  const saveAction = async ({ title, url }) => {
    await addLink(title, url).then(() => {
      setInfoChange(!infoChange);
    });
  };

  return (
    <FullContainer>
      {deleteModalOn ? (
        <DeleteModal
          visible={deleteModalOn}
          closable={true}
          maskClosable={true}
          onClose={closeDeleteModal}
          text={
            <>
              {t("manageProfilePageAlertDeleteLink1")}
              <br /> {t("manageProfilePageAlertDeleteLink2")}
            </>
          }
          setRealDelete={setRealDelete}
        />
      ) : (
        <>
          {linkModalOn ? (
            <AddLinkModal
              visible={linkModalOn}
              closable={true}
              maskClosable={true}
              onClose={closeLinkModal}
              saveAction={saveAction}
            />
          ) : (
            <>
              {editLinkModalOn && (
                <AddLinkModal
                  visible={editLinkModalOn}
                  closable={true}
                  maskClosable={true}
                  onClose={closeEditLinkModal}
                  saveAction={editAction}
                  original={linkList[editIdx]}
                />
              )}
            </>
          )}
        </>
      )}
      <TitleContainer>
        <TItleText>{t("manageProfilePage1")}</TItleText>
        {linkList?.length > 0 && (
          <ContainedButton
            type="secondary"
            styles="filled"
            states="default"
            size="small"
            label={t("manageProfilePage2")}
            onClick={addLinkOnClick}
          />
        )}
      </TitleContainer>
      {linkList?.length == 0 ? (
        <>
          <EmptyCard icon={EmptyLink} text={t("selectWalletPage3_4")} />
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("manageProfilePage7")}
            onClick={addLinkOnClick}
          />
        </>
      ) : (
        <ListContainer>
          {linkList?.map((link, idx) => (
            <EditableCard
              key={link.id}
              label={link.linkTitle}
              isEdit={true}
              isTrash={true}
              icon={LinkIcon}
              deleteOnClick={() => deleteOnClick(idx)}
              editOnClick={() => editOnClick(idx)}
            />
          ))}
        </ListContainer>
      )}
    </FullContainer>
  );
};

export default LinkComponent;
