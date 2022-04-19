from rest_framework import generics
from skillsly_service_ms.serializers import ServiceStatusSerializer
from skillsly_service_ms.models import Service

class ServiceStatusUpdateView(generics.RetrieveUpdateAPIView):

    queryset = Service.objects.all()
    serializer_class = ServiceStatusSerializer