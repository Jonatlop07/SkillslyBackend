from rest_framework import serializers
from skillsly_service_ms.models import Application

class ApplicationListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = "__all__"