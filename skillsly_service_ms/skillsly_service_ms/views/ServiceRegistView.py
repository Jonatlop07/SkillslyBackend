from rest_framework import generics
from skillsly_service_ms.serializers import ServiceRegistSerializer
from skillsly_service_ms.models import Service

class ServiceRegistView(generics.CreateAPIView):

    queryset = Service.objects.all()
    serializer_class = ServiceRegistSerializer