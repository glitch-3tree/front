import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const signupState = atom({
  key: "signupState",
  default: false,
});

export const loginDoneState = atom({
  key: "loginDoneState",
  default: false,
});

export const loginModalVisibleState = atom({
  key: "loginModalVisibleState",
  default: false,
});
