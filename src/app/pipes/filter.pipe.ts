import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'app/services/user.service';

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
    private userS: UserService) {
  }
  async getName(id: string) {
    if (!id) {
      return id;
    }
    const res = await this.userS.getUser(id)
    const name = res.name;
    return name;
  }
}
