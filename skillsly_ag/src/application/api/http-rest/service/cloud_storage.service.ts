import { BadRequestException, Injectable } from '@nestjs/common'
import { Bucket, Storage } from '@google-cloud/storage'
import { parse } from 'path';

@Injectable()
export class CloudStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      projectId: 'shining-env-347701',
      keyFilename: 'shining-env-347701-f91115ed7948.json'
    });
    this.bucket = this.storage.bucket('skillsly_st');
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination.replace(/^\.+/g, '').replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private setFilename(uploadedFile: Express.Multer.File): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`
      .replace(/^\.+/g, '')
      .replace(/^\/+/g, '')
      .replace(/\r|\n/g, '_');
  }

  async uploadFile(uploaded_file: Express.Multer.File, destination: string): Promise<any> {
    const fileName = this.setDestination(destination) + this.setFilename(uploaded_file);
    const file = this.bucket.file(fileName);
    try {
      await file.save(uploaded_file.buffer, { contentType: uploaded_file.mimetype });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return { ...file.metadata, media_locator: `https://storage.googleapis.com/${this.bucket.name}/${file.name}` };
  }

  async removeFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);
    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
