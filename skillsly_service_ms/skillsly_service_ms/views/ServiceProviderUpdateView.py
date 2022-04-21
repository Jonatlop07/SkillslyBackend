from rest_framework import generics
from skillsly_service_ms.serializers import ServiceUpdateProviderSerializer
from skillsly_service_ms.models import Service

class ServiceProviderUpdateView(generics.RetrieveUpdateAPIView):

    queryset = Service.objects.all()
    serializer_class = ServiceUpdateProviderSerializer