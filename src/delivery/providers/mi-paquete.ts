import { Injectable } from '@nestjs/common';
import { AbstractProvider } from '../abstract-provider';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class MiPaquete extends AbstractProvider {
  public name: string = 'MiPaquete';
  public providerId: string = '2';

  constructor(private httpService: HttpService) {
    super();
  }

  create(data: any): Observable<any> {
    // const posts = await lastValueFrom(
    //   this.httpService.get('/1').pipe(
    //     map(response => ({ ...response.data, provider: this.name })),
    //   ),
    // );
    const posts = this.httpService.get('/1', {
      baseURL: 'https://jsonplaceholder.typicode.com/posts',
    });
    return posts.pipe(
      map((response) => {
        return { ...response.data, provider: this.name };
      }),
    );
  }

  delete(id: string): Promise<any> {
    return Promise.resolve('Deleted MiPaquete Delivery');
  }

  getRates(id: string): Promise<any> {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    const rate = id
      ? lastValueFrom(
          this.httpService.get('/1', {
            baseURL: baseUrl,
          }),
        )
      : lastValueFrom(this.httpService.get('/1'));
    return rate;
  }

  status(id: string): Promise<any> {
    return Promise.resolve('Get Status MiPaquete Delivery');
  }

  update(id: string, data: any): Promise<any> {
    return Promise.resolve('Updated MiPaquete Delivery');
  }
}
