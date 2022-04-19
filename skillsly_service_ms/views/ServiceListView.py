from rest_framework import generics
from skillsly_service_ms import serializers
from skillsly_service_ms.serializers import ServiceListSerializer
from skillsly_service_ms.models import Service
from rest_framework.response import Response

class ServiceListView(generics.ListAPIView):

    serializer_class = ServiceListSerializer

    def get_queryset(self):
        queryset = Service.objects.all()

        return queryset

    def get(self, request):

        services = Service.objects.all()

        try:
            category = str(request.query_params['category'])
        except:
            pass
        else:
            services = services.filter(category__icontains=category)

        try:
            requester_id = request.query_params['requester_id']
        except:
            pass
        else:
            services = services.filter(requester_id=requester_id)

        serializer = ServiceListSerializer(services, many=True)

        return Response(serializer.data)

        





