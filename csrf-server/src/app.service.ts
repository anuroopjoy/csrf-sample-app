import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  transfer(params: { name: string; amount: number }): boolean {
    try {
      this.readFile('./accounts.json');
      this.writeFile('./accounts.json', JSON.stringify(params));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  readFile(path: string) {
    return fs.readFileSync(path, { encoding: 'utf-8' });
  }

  writeFile(path: string, data: string) {
    return fs.writeFileSync(path, data);
  }
}
