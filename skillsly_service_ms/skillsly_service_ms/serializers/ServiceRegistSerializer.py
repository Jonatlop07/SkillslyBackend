from rest_framework import serializers
from skillsly_service_ms.models import Service

class ServiceRegistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ["requester_id", "title", "description", "contact_info", "category"]