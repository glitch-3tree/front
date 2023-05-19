import { TooltipBubbleTailGray, TooltipBubbleTailGrayDown } from "assets/icons";
import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typography from "utils/style/Typography";

const DropBoxContainer = styled.div`
  width: 181px;
  height: 54px;
  border-radius: 18px;
  background-color: ${palette.grey_1};
  position: absolute;
  right: 19px;
  top: -100px;
  z-index: 1010;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 18px 0px #525a6b4b;
`;

const DropBoxOuterBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px auto;
  position: relative;
  z-index: 900;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  top: 0px;
  left: 0px;
`;

const BubbleTailBox = styled.div`
  width: 14px;
  height: 8px;
  position: absolute;
  top: -100px;
  background-color: transparent;
  filter: drop-shadow(0px 2px 10px #c4c4c444);
`;

const TapText = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  margin: auto 0px;
  text-align: center;
`;

const CopyPivot = ({
  className,
  onClose,
  maskClosable,
  visible,
  label,
  type,
  x,
  y,
}) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable && onMaskClick}
        tabIndex="-1"
        visible={visible}
      >
        <DropBoxOuterBox
          className={className}
          onClick={maskClosable && onMaskClick}
          tabIndex="-1"
          visible={visible}
        >
          {type == "down" && (
            <BubbleTailBox
              style={{
                backgroundImage: `url(${TooltipBubbleTailGrayDown})`,
                top: x - 7,
                left: y - 30,
              }}
            />
          )}
          <DropBoxContainer
            style={
              type == "up" ? { top: x, left: y } : { top: x, left: y - 180 }
            }
          >
            <TapText>{label}</TapText>
            {type == "up" && (
              <BubbleTailBox
                style={{
                  backgroundImage: `url(${TooltipBubbleTailGray})`,
                  top: "53px",
                  right: "83px",
                }}
              />
            )}
          </DropBoxContainer>
        </DropBoxOuterBox>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 999;
`;

export default CopyPivot;
