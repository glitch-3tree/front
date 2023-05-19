import { ContainedButton } from "components/button";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: 70px;
`;

const IntroTextBox = styled.div`
  width: 90%;
  margin: 0px auto;
`;

const InputContainer = styled.div`
  width: 90%;
  margin: 0px auto;
  margin-top: 70px;
`;

const FirstIntro = styled.div`
  ${Typography.Headline1}
  color: ${palette.Black};
  line-height: 33.35px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
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

// state = ["inactive", "filled", "typing", "verified", "error", "help"]

const PolygonIDLoginPage = () => {
  const [state, setState] = useState("inactive");
  const [jsonData, setJsonData] = useState(null);
  const [qrBtnDisabled, setQrBtnDisabled] = useState(false);

  const base_url = "https://b7aa-14-52-100-2.ngrok-free.app/";

  useEffect(() => {
    const date = new Date();
    const key = date.getTime().toString(36);
    fetch(base_url + `api/sign-in/${key}`, {
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

  const completeOnClick = () => {};

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>QR 코드로 로그인</FirstIntro>
        <SecondIntro>
          QR 코드를 스캔해 3TREE에 간편하게 로그인할 수 있어요
        </SecondIntro>
      </IntroTextBox>
      {jsonData && (
        <>
          <div style={{ textAlign: "center" }}>
            <QRCode
              level="Q"
              style={{ width: 256 }}
              value={JSON.stringify(jsonData)}
            />
          </div>
        </>
      )}
      <ButtonContainer>
        {state == "inactive" || state == "error" ? (
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
            onClick={completeOnClick}
          />
        )}
      </ButtonContainer>
    </FullContainer>
  );
};

export default PolygonIDLoginPage;
