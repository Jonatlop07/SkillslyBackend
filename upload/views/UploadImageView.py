from django.views import View
from django.http.response import HttpResponse
from django.middleware.csrf import get_token
from upload.models import Upload

class UploadImageView(View):

    def get(self, request):
            html = """
                <form method="post" enctype="multipart/form-data">
                <input type='text' style='display:none;' value='%s' name='csrfmiddlewaretoken'/>
                <input type="file" name="image" accept="image/*">
                <button type="submit">Upload Image</button>
                </form>
            """ % (get_token(request))
            return HttpResponse(html)

    def post(self, request):
            file = request.FILES['image']
            public_uri = Upload.upload_image(file, file.name)
            return HttpResponse(public_uri)