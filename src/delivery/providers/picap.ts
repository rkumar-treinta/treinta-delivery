import { Injectable, UseInterceptors } from '@nestjs/common';
import { AbstractProvider } from '../abstract-provider';
import {lastValueFrom, map, Observable} from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosInterceptor } from '../axios.interceptor';

@Injectable()
@UseInterceptors(AxiosInterceptor)
export class Picap extends AbstractProvider {
  public providerId: string = '1';
  public name: string = 'Picap';

  constructor(private httpService: HttpService) {
    super();
  }

  create(data: any): Observable<any> {
    // const users = await lastValueFrom(
    //   this.httpService
    //     .get('/1')
    //     .pipe(map((response) => ({ ...response.data, provider: this.name }))),
    // );

    const users = this.httpService.get('/1', {
      baseURL: 'https://jsonplaceholder.typicode.com/users',
    });

    return users.pipe(
      map((response) => {
        return { ...response.data, provider: this.name };
      }),
    );
  }

  delete(id: string): Promise<any> {
    return Promise.resolve();
  }

  getRates(id: string): Promise<any> {
    const baseUrl = 'https://jsonplaceholder.typicode.com/users';
    const rate = id
      ? lastValueFrom(this.httpService.get('/1', {
          baseURL: baseUrl,
        }))
      : lastValueFrom(this.httpService.get('/1'));
    return rate
  }

  status(id: string): Promise<any> {
    return Promise.resolve('Picap status');
  }

  update(id: string, data: any): Promise<any> {
    return Promise.resolve('Picap updated delivery');
  }
}
