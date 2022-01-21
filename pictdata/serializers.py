from rest_framework import serializers
from .models import PictDataModel, CustomUser, RandomQuestionModel
from rest_framework_jwt.settings import api_settings



class CustomuserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(Self,obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email', 'token')
        read_only_fields = ('id', )


class PictSerializer(serializers.ModelSerializer):
    user = CustomuserSerializer() 
    class Meta:
        model = PictDataModel
        fields = ('user', 'picture', 'title', 'date', 'id',)
        read_only_fields = ('id', 'user', )


class RandomQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomQuestionModel
        fields = ('question', 'id', )
        read_only_fields = ('id', )