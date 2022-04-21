from django.http import JsonResponse
from storages.backends.gcloud import GoogleCloudStorage

storage = GoogleCloudStorage()

class Upload:
    @staticmethod
    def upload_image(file, filename):

        try:
            target_path = '/images/' + filename
            storage.save(target_path, file)
        except Exception as e:
            pass

        data = dict()
        data["media_locator"] = storage.url(target_path)
        
        return JsonResponse(data)
    
    @staticmethod
    def upload_video(file, filename):

        try:
            target_path = '/videos/' + filename
            storage.save(target_path, file)
        except Exception as e:
            pass

        data = dict()
        data["media_locator"] = storage.url(target_path)
        
        return JsonResponse(data)