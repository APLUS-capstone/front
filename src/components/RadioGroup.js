import styled from "styled-components";
const RadioGroup = ({ name, options, selectedValue, onChange }) => {
  return (
    <RadioInputs>
      {options.map((option) => (
        <Radio key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            onChange={onChange}
            checked={selectedValue === option.value}
          />
          <span className="name">{option.label}</span>
        </Radio>
      ))}
    </RadioInputs>
  );
};

const RadioInputs = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #eee;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 300px;
  font-size: 14px;
`;

const Radio = styled.label`
  flex: 1 1 auto;
  text-align: center;

  input {
    display: none;
  }

  .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: #f3f3f3;
    }
  }

  input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }
`;

export default RadioGroup;
