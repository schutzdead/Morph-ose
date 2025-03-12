import { TextField } from "@mui/material"
import { nobgCompletion } from "../styles/mui"

export function TextInput ({field, name, label, placeholder, errors, style=''}) {
    return (
        <TextField 
            {...field}
            inputProps={{ style: nobgCompletion }} 
            id={name} type="text" 
            variant="standard" 
            label={label} placeholder={placeholder} 
            helperText= {errors ? errors.message : ""}
            error={errors ? Boolean(true) : Boolean(false)}
            className={`${style}`}
        />
    )
}


export function CustomTextArea ({field, label, errors, style=''}) {
    return(
        <TextField 
            {...field}
            id={label} type="text"
            multiline minRows={3}
            label={label}
            helperText= {errors ? errors.message : ""}
            error={errors ? Boolean(true) : Boolean(false)}
            className={`${style}`}
            variant="outlined"
        />
    )
}
export function PasswordInput ({field, name, label, placeholder, errors, style=''}) {
    return (
        <TextField 
            {...field}
            inputProps={{ style: nobgCompletion }} 
            id={name} type="password" 
            variant="standard" 
            label={label} placeholder={placeholder} 
            helperText= {errors ? errors.message : ""}
            error={errors ? Boolean(true) : Boolean(false)}
            className={`${style}`}
        />
    )
}

