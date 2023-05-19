import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography";

const ModalWrapper = styled.div`
  z-index: 200;
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  max-width: 560px;
  margin-left: 20px;
`;

const ModalItems = styled.div`
  position: relative;
  bottom: -84px;
  animation: slideUp 0.5s ease-out forwards;
  @keyframes slideUp {
    to {
      bottom: 16px;
    }
  }
  display: flex;
  align-items: center;
  height: 84px;
  padding: 23px 16px;
  border-radius: 12px;
  background-color: ${palette.white};
`;

const ModalInfoText = styled.div`
  & > p {
    margin: 0;
    color: ${palette.black};
    ${Typography.Headline3};
  }
  & > p:last-of-type {
    color: ${palette.grey_3};
    ${Typography.Caption1}
  }
`;

const UnvalidFormatModal = ({ visible, onClickEvent }) => {
  const { t } = useTranslation();

  return (
    <>
      {visible && (
        <ModalWrapper onClick={onClickEvent}>
          <ModalItems>
            <ModalInfoText>
              <p>인증에 실패했어요!</p>
              <p>다시 한번 QR코드 인증을 시도해주세요</p>
            </ModalInfoText>
          </ModalItems>
        </ModalWrapper>
      )}
    </>
  );
};

export default UnvalidFormatModal;
