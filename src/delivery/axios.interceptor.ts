import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AxiosInterceptor implements NestInterceptor {
  private axiosInterceptor: any;
  private providerId: string;

  constructor(private httpService: HttpService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    this.providerId = context.switchToHttp().getRequest().params.id;

    //  delete axios interceptors after every call
    if (!!this.axiosInterceptor || this.axiosInterceptor === 0) {
      await this.httpService.axiosRef.interceptors.request.eject(
        this.axiosInterceptor,
      );

      this.httpService.axiosRef.interceptors.response.eject(
        this.axiosInterceptor,
      );
    }

    // add request header on request
    this.axiosInterceptor = this.httpService.axiosRef.interceptors.request.use(
      (config) => {
        if (this.providerId === '1') {
          config.baseURL = 'https://jsonplaceholder.typicode.com/users';
          console.log('1');
          return config;
        }

        if (this.providerId === '2') {
          config.baseURL = 'https://jsonplaceholder.typicode.com/posts';
          console.log('2');
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axiosInterceptor = this.httpService.axiosRef.interceptors.response.use(
      (response) => {
        return { data: response.data, status: response.status };
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return next.handle();
  }
}
