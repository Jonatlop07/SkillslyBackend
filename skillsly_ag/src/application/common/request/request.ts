import {
  RequestParamsWithBody,
  RequestParamsWithoutBody,
} from '@application/common/request/request_params';
import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class Request {
  constructor(private readonly http_service: HttpService) {}

  public getRequest<T>(get_params: RequestParamsWithoutBody): Promise<T> {
    const { url, params } = get_params;
    return firstValueFrom(
      this.http_service.get(url, { params }).pipe(
        map((response): T => {
          if (!response.data) {
            throw new BadGatewayException();
          }
          return response.data as T;
        }),
      ),
    );
  }

  public postRequest<T>(post_params: RequestParamsWithBody): Promise<T> {
    const { url, params, body } = post_params;
    return firstValueFrom(
      this.http_service.post<T>(url, body, { params }).pipe(
        map((response: AxiosResponse<T>): T => {
          return response.data;
        }),
        catchError((err) => {
          throw err;
        }),
      ),
    );
  }

  public putRequest<T>(put_params: RequestParamsWithBody): Promise<T> {
    const { url, params, body } = put_params;
    return firstValueFrom(
      this.http_service.put(url, body, { params }).pipe(
        map((response): T => {
          if (!response.data) {
            throw new BadGatewayException();
          }
          return response.data as T;
        }),
      ),
    );
  }

  public patchRequest<T>(patch_params: RequestParamsWithBody): Promise<T> {
    const { url, params, body } = patch_params;
    return firstValueFrom(
      this.http_service.patch(url, body, { params }).pipe(
        map((response): T => {
          if (!response.data.success) {
            throw new BadGatewayException();
          }
          return response.data as T;
        }),
      ),
    );
  }

  public deleteRequest<T>(delete_params: RequestParamsWithoutBody): Promise<T> {
    const { url, params } = delete_params;
    return firstValueFrom(
      this.http_service.delete(url, { params }).pipe(
        map((response): T => {
          if (!response.data) {
            throw new BadGatewayException();
          }
          return response.data as T;
        }),
      ),
    );
  }
}
