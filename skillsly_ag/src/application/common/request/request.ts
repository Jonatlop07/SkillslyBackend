import {
  RequestParamsWithBody,
  RequestParamsWithoutBody,
} from '@application/common/request/request_params';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class Request {
  constructor(private readonly http_service: HttpService) {}

  public getRequest<T>(get_params: RequestParamsWithoutBody): Promise<T> {
    const { url, params } = get_params;
    return firstValueFrom(
      this.http_service.get<T>(url, { params }).pipe(
        map((response): T => response.data),
        catchError((err) => {
          throw err;
        }),
      ),
    );
  }

  public postRequest<T>(post_params: RequestParamsWithBody): Promise<T> {
    const { url, params, body } = post_params;
    return firstValueFrom(
      this.http_service.post<T>(url, body, { params }).pipe(
        map((response: AxiosResponse<T>): T => response.data),
        catchError((err) => {
          throw err;
        }),
      ),
    );
  }

  public putRequest<T>(put_params: RequestParamsWithBody): Promise<T> {
    const { url, params, body } = put_params;
    return firstValueFrom(
      this.http_service.put<T>(url, body, { params }).pipe(
        map((response): T => response.data),
        catchError((err) => {
          throw err;
        }),
      ),
    );
  }

  public patchRequest<T>(patch_params: RequestParamsWithBody): Promise<T> {
    const { url, params, body } = patch_params;
    return firstValueFrom(
      this.http_service.patch<T>(url, body, { params }).pipe(
        map((response): T => response.data),
        catchError((err) => {
          throw err;
        }),
      ),
    );
  }

  public deleteRequest<T>(delete_params: RequestParamsWithoutBody): Promise<T> {
    const { url, params } = delete_params;
    return firstValueFrom(
      this.http_service.delete<T>(url, { params }).pipe(
        map((response): T => response.data),
        catchError((err) => {
          throw err;
        }),
      ),
    );
  }
}
