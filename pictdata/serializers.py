from dataclasses import fields
import imp
from rest_framework import serializers
from .models import PictDataModel, CustomUser



class PictSerializer(serializers.ModelSerializer):
    class Meta:
        model = PictDataModel
        fields = ('user', 'picture', 'title', 'date', 'id', )
        read_only_fields = ('id', 'user', )


class CustomuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email', 'id')
        read_only_fields = ('id', )