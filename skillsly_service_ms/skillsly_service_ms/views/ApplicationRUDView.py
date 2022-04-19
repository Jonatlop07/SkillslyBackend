from rest_framework import generics
from skillsly_service_ms.serializers import ApplicationUpdateSerializer
from skillsly_service_ms.models import Application

class ApplicationRUDView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Application.objects.all()
    serializer_class = ApplicationUpdateSerializer