import { FormGroup, Validators } from "@angular/forms";

export function OnFormControlValueChange(authReqForm : FormGroup, sourceFormControlName : string, matchValue : string, targetFormControlName : string) : void {
    authReqForm.get(sourceFormControlName)?.valueChanges.subscribe(value => {
        const targetFormControl = authReqForm.get(targetFormControlName);
        if(value === matchValue){
            targetFormControl?.addValidators(Validators.required);
        }else{
            targetFormControl?.clearValidators();
        }
        targetFormControl?.updateValueAndValidity();
    })
}