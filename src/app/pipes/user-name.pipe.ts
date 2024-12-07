import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(email : string | undefined): string {
    if(email == undefined){
      return '';
    }
    return email.substring(0,email.indexOf('@'))
  }

}
