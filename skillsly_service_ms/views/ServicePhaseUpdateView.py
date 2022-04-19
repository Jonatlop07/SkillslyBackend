from rest_framework import generics
from skillsly_service_ms.serializers import ServicePhaseSerializer
from skillsly_service_ms.models import Service

class ServicePhaseUpdateView(generics.RetrieveUpdateAPIView):

    queryset = Service.objects.all()
    serializer_class = ServicePhaseSerializer

    