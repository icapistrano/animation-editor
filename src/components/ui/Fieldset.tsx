import { FunctionComponent } from "react";

interface IInputType {
  placeholder: string;
  value: number;
  isDisabled?: boolean;
  onChange?: (value: number) => void;
}

export const Fieldset: FunctionComponent<{
  label: string;
  inputs: IInputType[];
}> = ({ label, inputs }) => {
  return (
    <div className="flex justify-between items-center">
      <legend>{label}</legend>
      <div className="flex flex-row gap-x-4 w-9/12 justify-end flex-wrap">
        {inputs.map(({ placeholder, value, isDisabled, onChange }) => (
          <input
            key={placeholder}
            className="mb-4 border rounded-md py-1 px-2 text-primary bg-primary text-white w-1/4"
            type="number"
            placeholder={placeholder}
            defaultValue={value}
            disabled={isDisabled}
            onChange={(e) => onChange?.(parseFloat(e.target.value))}
          ></input>
        ))}
      </div>
    </div>
  );
};
