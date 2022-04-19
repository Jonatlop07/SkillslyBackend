from rest_framework import serializers
from skillsly_service_ms.models import Service

class ServicePhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ["phase"]