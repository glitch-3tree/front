import axios from "axios";
import { ContainedButton } from "components/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QRCode } from "react-qr-svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 70px;
  background-color: ${palette.black};
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
  top: 460px;
  padding-bottom: 160px;
  bottom: 136px;
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

// state = ["inactive", "filled", "typing", "verified", "error", "help"]

const PolygonIDLoginPage = () => {
  const [state, setState] = useState("inactive");
  const [jsonData, setJsonData] = useState(null);
  const date = new Date();
  const [key, setKey] = useState(date.getTime().toString(36));

  const navigate = useNavigate();

  const base_url = "https://b7aa-14-52-100-2.ngrok-free.app/";

  useEffect(() => {
    fetch(base_url + `/api/sign-in/${key}`, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { t } = useTranslation();

  //백엔드로 key와 함께 authenticate된 상태인지 확인하는 코드.
  const completeOnClick = async (frontKey) => {
    let resultValue = 0;
    await axios
      .get(`/public/polygon-id/did?frontKey=${frontKey}`)
      .then((data) => {
        resultValue = data.data.resultData;
        console.log(data);
        console.log("auth 성공함~!");
        navigate("./");
      });
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>QR 코드로 인증하기</FirstIntro>
        <SecondIntro>
          QR코드를 스캔하면 폴리곤 아이디로
          <br /> 3TREE에 간편하게 로그인 할 수 있어요
        </SecondIntro>
      </IntroTextBox>
      {jsonData && (
        <QRCodeContainer>
          <QRCodeSubContainer>
            <QRCode
              level="Q"
              style={{ width: 200 }}
              value={JSON.stringify(jsonData)}
            />
          </QRCodeSubContainer>
        </QRCodeContainer>
      )}
      <ButtonContainer>
        {state == "active" || state == "error" ? (
          <ContainedButton
            type="primary"
            styles="filled"
            states="disabled"
            size="large"
            label="인증 완료"
          />
        ) : (
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label="인증 완료"
            onClick={() => completeOnClick(key)}
          />
        )}
      </ButtonContainer>
    </FullContainer>
  );
};

export default PolygonIDLoginPage;
