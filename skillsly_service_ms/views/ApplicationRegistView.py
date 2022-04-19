from rest_framework import generics
from skillsly_service_ms.serializers import ApplicationRegistSerializer
from skillsly_service_ms.models import Application

class ApplicationRegistView(generics.CreateAPIView):

    queryset = Application.objects.all()
    serializer_class = ApplicationRegistSerializer