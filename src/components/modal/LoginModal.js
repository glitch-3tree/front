import { useGoogleLogin } from "@react-oauth/google";
import { PolygonSmallIcon, SocialGoogle } from "assets/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { requestLogin } from "utils/api/auth";
import { loginState, signupState } from "utils/atoms/login";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography/index";
import { BottomModal } from ".";
import { ContainedButton } from "../button";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
  margin-bottom: 45px;
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

const TermsBox = styled.div`
  margin-top: 31px;
  ${Typography.Caption2}
  color: ${palette.grey_5};

  & > a {
    text-decoration: underline;
    color: ${palette.grey_5};
  }
`;

const PolygonLoginButton = styled.button`
  min-width: 115px;
  width: 100%;
  height: 56px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: 12px;
  background-color: #8a46ff;
  border: 1px solid ${palette.grey_6};
`;

const IconContainer = styled.img`
  width: 20px;
  height: 20px;
  margin: auto 0px;
  margin-right: 6px;
`;

const SecondaryTextBox = styled.div`
  ${Typography.Headline2}
  font-size: 17px;
  color: ${palette.white};
  margin: auto 0px;
`;

const LoginModalInner = (type, setStatus, onClose) => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setIsSignup = useSetRecoilState(signupState);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const responseGoogle = async (code) => {
    await requestLogin(code).then((data) => {
      if (type == "receive" || data === "SIGNUP") {
        setStatus(true);
        setIsSignup(true);
      } else if (data === "LOGIN") {
        setStatus(false);
      }
      setIsLoggedIn(true);
      onClose();
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      responseGoogle(codeResponse.access_token);
    },
  });

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("loginModal1")}</FirstIntro>
        <SecondIntro>
          {t("loginModal2")}
          <br />
          {t("loginModal2_2")}
        </SecondIntro>
      </IntroTextBox>
      <ContainedButton
        type="secondary"
        styles="outlined"
        states="default"
        size="large"
        label={t("loginModal3")}
        icon={SocialGoogle}
        className={"googleButton"}
        onClick={login}
      />
      <PolygonLoginButton
        onClick={() => {
          navigate("./polygonIDLogin");
        }}
      >
        <IconContainer src={PolygonSmallIcon} />
        <SecondaryTextBox>{t("polygonLogin4")}</SecondaryTextBox>
      </PolygonLoginButton>
      <TermsBox>
        {t("loginModal4")}
        <a href="https://3tree.io/privacyPolicy">{t("loginModal5")}</a>
        {t("loginModal6")}
        <a href="https://3tree.io/termsOfService">{t("loginModal7")}</a>
        {t("loginModal8")}
      </TermsBox>
    </FullContainer>
  );
};

const LoginModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  type,
  setStatus,
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() => LoginModalInner(type, setStatus, onClose)}
    />
  );
};

export default LoginModal;
