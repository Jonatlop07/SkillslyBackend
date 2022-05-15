import { Module } from '@nestjs/common'
import { StorageController } from '@application/api/http-rest/controller/storage.controller'
import { CloudStorageService } from '@application/api/http-rest/service/cloud_storage.service'

@Module({
  providers: [CloudStorageService],
  controllers: [StorageController],
  exports: [CloudStorageService]
})
export class StorageModule {}
