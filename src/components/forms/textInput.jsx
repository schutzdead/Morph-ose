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

