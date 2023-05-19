import styled from "styled-components";
import { COLORS as palette } from "utils/style/Color/colors";
import Typograpy from "utils/style/Typography";

const InputBoxContainer = styled.div``;

const LableFullBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
`;

const LabelBox = styled.div`
  ${Typograpy.Headline4}
  color: ${palette.grey_3};
  margin-bottom: 4px;
`;

const RequiredMark = styled.div`
  ${Typograpy.Caption2}
  color: #EF7642;
  margin-left: 2px;
`;

const TextareaContainer = styled.textarea`
  width: 100%;
  height: 137px;
  border-radius: 8px;
  padding: 15px 16px 32px 16px;
  ${Typograpy.Headline3}
  resize: none;
  border: 1px solid ${palette.grey_6};
  &::-webkit-input-placeholder {
    color: ${palette.grey_5};
  }
  &:focus {
    outline: none;
    border: 1px solid ${palette.blue_2};
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
  }
`;

const TypeNumber = styled.div`
  width: 100%;
  display: flex;
  ${Typograpy.Caption2}
  text-align: right;
  color: ${palette.grey_3};
  margin-top: 4px;
`;
const InputFullBox = styled.div`
  position: relative;
`;

// state = ["inactive", "filled", "typing", "verified", "error", "help"]
const TextAreaBox = ({
  label,
  isRequired,
  placeholder,
  maxSize,
  value,
  onChange,
}) => {
  return (
    <InputBoxContainer>
      <LableFullBox>
        <LabelBox>{label}</LabelBox>
        {isRequired && <RequiredMark>*</RequiredMark>}
      </LableFullBox>
      <InputFullBox>
        <TextareaContainer
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <TypeNumber>
          {value?.length}/{maxSize}
        </TypeNumber>
      </InputFullBox>
    </InputBoxContainer>
  );
};

export default TextAreaBox;
