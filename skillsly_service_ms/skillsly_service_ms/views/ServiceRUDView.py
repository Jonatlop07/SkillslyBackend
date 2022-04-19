from rest_framework import generics
from skillsly_service_ms.serializers import ServiceRUDSerializer
from skillsly_service_ms.models import Service

class ServiceRUDView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Service.objects.all()
    serializer_class = ServiceRUDSerializer