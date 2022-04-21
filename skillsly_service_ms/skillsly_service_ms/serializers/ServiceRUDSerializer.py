from rest_framework import serializers
from skillsly_service_ms.models import Service

class ServiceRUDSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ["title", "description", "contact_info", "category", ]