import { ArrowRefreshIcon, IconX } from "assets/icons";
import axios from "axios";
import { ContainedButton } from "components/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QRCode } from "react-qr-svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { AuthFailModal, LoginComplete } from "./components";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 70px;
  background-color: ${palette.black};
`;

const IconXContainer = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 32px;
  left: 20px;
  cursor: pointer;
`;

const IntroTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${palette.white};
`;

const FirstIntro = styled.div`
  ${Typography.Headline1}
  line-height: 33.35px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  line-height: 23.8px;
  margin-top: 14px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 30px 20px;
  position: absolute;
  bottom: 16px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 280px;
  margin: 56px auto 0 auto;
  background: linear-gradient(180deg, #4880ee 1.06%, #8a46ff 100%);
  border-radius: 36px;
`;

const QRCodeSubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
  height: 248px;
  background-color: white;
  border-radius: 24px;
`;

const RefreshButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

const RefreshText = styled.div`
  ${Typography.Caption3};
  color: ${palette.grey_4};
  text-align: center;
`;

const RefreshButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${palette.grey_1};
  border-radius: 16px;
  margin-top: 12px;
`;

const IconContainer = styled.img`
  width: 20px;
  height: 20px;
  margin: 10px;
`;

// state = ["default", "complete", "fail"]

const PolygonIDLoginPage = () => {
  const [jsonData, setJsonData] = useState(null);
  const [completeState, setCompleteState] = useState("default");
  const date = new Date();
  const [frontKey, setFrontKey] = useState(date.getTime().toString(36));

  const navigate = useNavigate();

  const base_url = "https://4cae-14-52-100-2.ngrok-free.app";

  useEffect(() => {
    getQRCode();
  }, []);

  const getQRCode = async () => {
    await fetch(base_url + `/api/sign-in/${frontKey}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((r) =>
        Promise.all([Promise.resolve(r.headers.get("x-id")), r.json()])
      )
      .then(([id, data]) => {
        console.log(data);
        setJsonData(data);
        return id;
      });
  };

  useEffect(() => {
    getQRCode();
  }, []);

  const { t } = useTranslation();

  //백엔드로 key와 함께 authenticate된 상태인지 확인하는 코드.
  const completeOnClick = async (frontKey) => {
    let resultValue = 0;
    await axios
      .get(`/public/polygon-id/did?frontKey=${frontKey}`)
      .then((data) => {
        resultValue = data.data.resultData;
        console.log("auth 성공함~!");
        setCompleteState("complete");
        localStorage.setItem("frontKey", frontKey);
      })
      .catch(() => {
        setCompleteState("fail");
        setTimeout(() => {
          setCompleteState("default");
        }, 4000);
      });
  };

  return (
    <FullContainer>
      {completeState === "complete" ? (
        <LoginComplete />
      ) : (
        <>
          <IconXContainer
            src={IconX}
            onClick={() => {
              navigate(-1);
            }}
          />
          <IntroTextBox>
            <FirstIntro>{t("polygonLogin6")}</FirstIntro>
            <SecondIntro>
              Scan the QR code to
              <br /> easily log in to 3TREE with your Polygon ID
            </SecondIntro>
          </IntroTextBox>
          <QRCodeContainer>
            <QRCodeSubContainer>
              <QRCode
                level="Q"
                style={{ width: 200 }}
                value={JSON.stringify(jsonData)}
              />
            </QRCodeSubContainer>
          </QRCodeContainer>
          <RefreshButtonContainer>
            <RefreshText>
              If you get an error,
              <br />
              try refreshing and verifying again
            </RefreshText>
            <RefreshButton onClick={getQRCode}>
              <IconContainer src={ArrowRefreshIcon} />
            </RefreshButton>
          </RefreshButtonContainer>
          <AuthFailModal
            visible={completeState === "fail"}
            onClickEvent={() => {
              setCompleteState("default");
            }}
          />
          <ButtonContainer>
            <ContainedButton
              type="primary"
              styles="filled"
              style={{ backgroundColor: "#8a46ff" }}
              states="default"
              size="large"
              label="Verified"
              onClick={() => completeOnClick(frontKey)}
            />
          </ButtonContainer>
        </>
      )}
    </FullContainer>
  );
};

export default PolygonIDLoginPage;
