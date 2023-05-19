import { IconX } from "assets/icons";
import polygonidComplete from "assets/lottie/polygonid-complete.json";
import { ContainedButton } from "components/button";
import Lottie from "react-lottie-player";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";

const IconXContainer = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 32px;
  left: 20px;
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

const LottieContainer = styled.div`
  width: 246px;
  height: 246px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 127px auto 0 auto;
`;

// state = ["default", "complete", "fail"]

const PolygonIDLoginPage = () => {
  return (
    <>
      <IconXContainer
        src={IconX}
        onClick={() => (window.location.href = "/")}
      />
      <LottieContainer>
        <Lottie animationData={polygonidComplete} play />
      </LottieContainer>
      <IntroTextBox>
        <FirstIntro>폴리곤 ID 인증 성공!</FirstIntro>
        <SecondIntro>
          이제 3TREE에서 내 프로필 관리하고
          <br />
          소셜 송금할 수 있어요
        </SecondIntro>
      </IntroTextBox>
      <ButtonContainer>
        <ContainedButton
          type="primary"
          styles="filled"
          style={{ backgroundColor: "#8a46ff" }}
          states="default"
          size="large"
          label="닫기"
          onClick={() => (window.location.href = "/")}
        />
      </ButtonContainer>
    </>
  );
};

export default PolygonIDLoginPage;
