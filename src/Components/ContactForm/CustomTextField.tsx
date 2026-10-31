import { TextField } from "@mui/material";
import { TField } from "./ContactModel";

export const CustomTextField: React.FC<TField> = ({
    type,
    name,
    label,
    value,
    onChange,
    placeholder,
    multiline,
    onBlur,
    error,
    helperText,
    required,
    autoComplete,
}) => {
    return (
        <TextField
        type={type}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        multiline={multiline}
        minRows={multiline ? 4 : undefined}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        required={required}
        autoComplete={autoComplete}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
            color: "black",
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root.Mui-error fieldset": {
            borderColor: "#d32f2f",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "#d32f2f",
          },
        }}
      />
    );
};
