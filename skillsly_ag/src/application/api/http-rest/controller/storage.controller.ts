import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Public } from '@application/api/graphql/authentication/decorator/public';
import { CloudStorageService } from '@application/api/http-rest/service/cloud_storage.service';

@Controller('media')
export class StorageController {
  private readonly logger: Logger = new Logger(StorageController.name);

  constructor(private readonly storage_service: CloudStorageService) {}

  @Public()
  @Post('image')
  @UseInterceptors(FileInterceptor('media'))
  public async uploadImage(@UploadedFile() media: Express.Multer.File) {
    return await this.storage_service.uploadFile(media, 'images/');
  }

  @Public()
  @Post('video')
  @UseInterceptors(FileInterceptor('media'))
  public async uploadVideo(@UploadedFile() media: Express.Multer.File) {
    return await this.storage_service.uploadFile(media, 'videos/');
  }
}

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

  public async createPost() {
    this.posts_service.createPost({
      ...post,
      content_elements: await Promise.all(
        post.content_elements.map(async ({ description, media, media_type }) => {
          const map_media = ({ media_locator }) => ({
            description,
            media_type,
            media_locator
          });
          return firstValueFrom((
              media_type === 'image' ?
                this.uploadPostImage(media)
                : this.uploadPostVideo(media)
            ).pipe(
              map(map_media),
              catchError((err) => {
                throw err
              })
            )
          );
        })
      )
    })
      .subscribe(() => {

      });
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

  private uploadPostVideo(file: File) {
    const form_data = new FormData();
    form_data.append('media', file, {
      contentType: 'video/*'
    });
    return this.media_service.uploadVideo(file);
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
