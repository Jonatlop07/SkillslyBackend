from rest_framework import serializers
from skillsly_service_ms.models import Service

class ServiceUpdateProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ["provider_id"]