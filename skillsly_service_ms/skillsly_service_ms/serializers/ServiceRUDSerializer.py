from rest_framework import serializers
from skillsly_service_ms.models import Service

class ServiceRUDSerializer(serializers.ModelSerializer):

    title = serializers.CharField(
        required=False
    )
    description = serializers.CharField(
        required=False
    )
    contact_info = serializers.CharField(
        required=False
    )
    category = serializers.CharField(
        required=False
    )

    class Meta:
        model = Service
        fields = ["title", "description", "contact_info", "category", ]