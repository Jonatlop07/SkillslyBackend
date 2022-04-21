from rest_framework import serializers
from skillsly_service_ms.models import Service

class ServiceStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ["canceled"]