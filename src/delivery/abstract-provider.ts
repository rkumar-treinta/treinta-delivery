import { Observable } from 'rxjs';

export abstract class AbstractProvider {
  abstract providerId: string;
  abstract name: string;

  abstract getRates(id: string): Promise<any>;

  abstract create(data: any): Observable<any>;

  abstract update(id: string, data: any): Promise<any>;

  abstract delete(id: string): Promise<any>;

  abstract status(id: string): Promise<any>;
}
