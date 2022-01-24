from tkinter.tix import Tree
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



class PictSerializer(serializers.ModelSerializer):
    user = CustomuserSerializer(read_only=True) 
    user_uid = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = PictDataModel
        fields = ('user', 'user_uid', 'picture', 'title', 'date', 'id',)
        read_only_fields = ('id', 'user', )

    def create(self, validated_data):
        validated_data['user'] = validated_data.get('user_uid', None)
        if validated_data['user'] is None:
            raise serializers.ValidationError('user not found.:ユーザーが見つかりません')
        del validated_data['user_uid']
        return PictDataModel.objects.create(**validated_data)

class RandomQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomQuestionModel
        fields = ('question', 'id',)
        read_only_fields = ('id',)