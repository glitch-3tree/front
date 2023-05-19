import "App.css";
import {
  ComponentTestPage,
  EditProfilePage,
  IntroPage,
  NotFoundPage,
  PolygonIDLoginPage,
  ProfilePage,
  ReceiveTokenPage,
  SendTokenPage,
  SettingPage,
} from "pages";
import { PrivacyPolicy, TermsOfService } from "pages/TermsAndConditionPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import ScrollToTop from "utils/functions/ScrollTop";
import { COLORS as palette } from "utils/style/Color/colors";
import "utils/style/Font/font.css";

const BodyInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${palette.background};
`;

const WebAppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: ${palette.white};
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <BodyInner>
            <WebAppContainer>
              <ScrollToTop />
              <Routes>
                <Route exact path="/" element={<IntroPage />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route
                  path="/polygonIDLogin"
                  element={<PolygonIDLoginPage />}
                />
                <Route path="/components" element={<ComponentTestPage />} />
                <Route path="/editProfile" element={<EditProfilePage />} />
                <Route path="/sendToken" element={<SendTokenPage />} />
                <Route
                  path="/receiveToken/:key"
                  element={<ReceiveTokenPage />}
                />
                <Route path="/@:id" element={<ProfilePage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/termsOfService" element={<TermsOfService />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </WebAppContainer>
          </BodyInner>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
