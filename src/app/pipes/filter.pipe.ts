import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({
  name: 'getName',
  pure: true
})
export class GetNamePipe implements PipeTransform {

  transform(id: string) {
    return this.getName(id)
  }
  constructor(
    private fireS: FirebaseService) {
  }
  async getName(id: string) {
    const res = await this.fireS.getUser(id)
    const name = res.name;
    return name;
  }
}
