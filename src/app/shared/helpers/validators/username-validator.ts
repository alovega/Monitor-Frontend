import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../views/users/users.service';


// custom validator to check if a username exists
export function UsernameExists(controlName: string, matchingControlName: string) {
    let usersService: UsersService;
    usersService.getUsers().subscribe(
        (res) => {
            
        }
    );
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            matchingControl.setErrors({ mustMatch: true });
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
