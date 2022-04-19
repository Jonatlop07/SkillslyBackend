from rest_framework import generics
from skillsly_service_ms.serializers import ApplicationListSerializer
from skillsly_service_ms.models import Application
from rest_framework.response import Response

class ServiceApplicationsListView(generics.ListAPIView):

    serializer_class = ApplicationListSerializer

    def get_queryset(self):
        
        applications = Application.objects.all()
        return applications

    def get(self, request):

        service_id = request.query_params["service_id"]

        applications = Application.objects.filter(service_id=service_id)

        serializer = ApplicationListSerializer(applications, many=True)

        return Response(serializer.data)