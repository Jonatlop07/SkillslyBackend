from django.views import View
from django.http.response import HttpResponse
from django.middleware.csrf import get_token
from upload.models import Upload

class UploadVideoView(View):

    def get(self, request):
            html = """
                <form method="post" enctype="multipart/form-data">
                <input type='text' style='display:none;' value='%s' name='csrfmiddlewaretoken'/>
                <input type="file" name="video" accept="video/*">
                <button type="submit">Upload Video</button>
                </form>
            """ % (get_token(request))
            return HttpResponse(html)

    def post(self, request):
            file = request.FILES['video']
            public_uri = Upload.upload_video(file, file.name)
            return HttpResponse(public_uri)