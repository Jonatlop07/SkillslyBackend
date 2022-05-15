import { Controller, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { HttpService } from '@nestjs/axios'
import { Express } from 'express'
import FormData from 'form-data'
import { catchError, firstValueFrom, map } from 'rxjs'
import { AxiosResponse } from 'axios'

const STORAGE_MS_URL = 'http://skillsly-storage-ms-srv:4000';

/*

interface FileUploadResponse {
  media_locator: string;
}

class PostComponent {
  constructor(
    private readonly comment_service: CommentService,
    private readonly media_service: MediaService
  ) {
  }

  public createComment() {
    this.uploadPostImage(file)
      .subscribe(({ media_locator }) => {
        this.comment_service.createComment(new_comment_data, media_locator);
      });
  }

  private uploadPostImage(file: File) {
    const form_data = new FormData();
    form_data.append('media', file, {
      contentType: 'image/*'
    });
    return this.media_service.uploadImage(file);
  }
}

class MediaService {
  constructor(private readonly http: HttpClient) {
  }

  uploadImage() {
    return this.http.post<FileUploadResponse>(
      `${this.API_URL}/api/v1/media/upload-image`,
      form_data,
      {
        headers: form_data.getHeaders()
      }
    );
  }
}
*/

@Controller('media')
export class MediaController {
  private readonly logger: Logger = new Logger(MediaController.name);

  constructor(private readonly http_service: HttpService) {
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('media'))
  public async uploadImage(@UploadedFile() media: Express.Multer.File) {
    const bodyFormData = new FormData();
    bodyFormData.append('image', media, {
      contentType: 'image/*'
    });
    return await firstValueFrom(this.http_service.post(`${STORAGE_MS_URL}/upload-image`, bodyFormData, {
        headers: bodyFormData.getHeaders()
      })
        .pipe(
          map((response: AxiosResponse) => response.data),
          catchError((err) => {
            throw err;
          }),
        )
    );
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('media'))
  public async uploadVideo(@UploadedFile() media: Express.Multer.File) {
    const bodyFormData = new FormData();
    bodyFormData.append('video', media, {
      contentType: 'video/*'
    });
    return await firstValueFrom(this.http_service.post(`${STORAGE_MS_URL}/upload-video`, bodyFormData, {
        headers: bodyFormData.getHeaders()
      })
        .pipe(
          map((response: AxiosResponse) => response.data),
          catchError((err) => {
            throw err;
          }),
        )
    );
  }
}
