from dataclasses import fields
from itsdangerous import Serializer
from rest_framework import serializers
from .models import PictDataModel, CustomUser, RandomQuestionModel, CommentModel
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class CustomuserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email', 'token', 'id', 'password2',)
        read_only = ('id', 'token', )

    def get_token(Self,obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)
        instance = self.Meta.model(**validated_data)
        if password is not None and password2 == password :
            instance.set_password(password)
        instance.save()
        return instance


class PictSerializer(serializers.ModelSerializer):
    user = CustomuserSerializer(read_only=True) 
    user_uid = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = PictDataModel
        fields = ('user', 'picture', 'title', 'date', 'id', 'user_uid')
        read_only_fields = ('id', 'user', )

    def create(self, validated_data):
        validated_data['user'] = validated_data.get('user_uid', None)
        if validated_data['user'] is None:
            raise serializers.ValidationError('user not found.:ユーザーが見つかりません')
        del validated_data['user_uid']
        return PictDataModel.objects.create(**validated_data)


class ComparePictSerializer(PictSerializer):
    anotherPict = PictSerializer(read_only=True)
    other_uid = serializers.PrimaryKeyRelatedField(queryset=PictDataModel.objects.all(), write_only=True)

    class Meta:
        model = PictDataModel
        fields=('user', 'picture', 'title', 'date', 'id', 'user_uid', 'other_uid', 'anotherPict' )
        read_only_fields = ('id', 'user', 'anotherPict')

    def create(self, validated_data):
        validated_data['anotherPict'] = validated_data.get('other_uid', None)
        if validated_data['anotherPict'] is None:
            raise serializers.ValidationError('元画像が見つかりません')
        del validated_data['other_uid']
        validated_data['user'] = validated_data.get('user_uid', None)
        if validated_data['user'] is None:
            raise serializers.ValidationError('user not found.:ユーザーが見つかりません')
        del validated_data['user_uid']
        return PictDataModel.objects.create(**validated_data)


class PictDetailSerializer(serializers.ModelSerializer):
    user = CustomuserSerializer(read_only=True) 
    user_uid = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)
    comments = serializers.SerializerMethodField()
    childPict = serializers.SerializerMethodField() 

    class Meta:
        model = PictDataModel
        fields = ('user', 'picture', 'title', 'date', 'id', 'user_uid', 'comments', 'childPict','anotherPict')
        read_only_fields = ('id', 'user', )
    
    def get_comments(self, obj):
        try:
            comments_data = CommentsSerializer(CommentModel.objects.all().filter(picture = PictDataModel.objects.get(id=obj.id)), many=True).data
            return comments_data

        except:
            comments_data = None
            return comments_data

    def get_childPict(self, obj):
        try:
            childPict_data = PictSerializer(PictDataModel.objects.all().filter(anotherPict = PictDataModel.objects.get(id=obj.id)), many=True).data
            return childPict_data

        except:
            childPict_data = None
            return childPict_data


class CommentsSerializer(serializers.ModelSerializer):
    picture_id = serializers.PrimaryKeyRelatedField(queryset=PictDataModel.objects.all(), write_only=True)
    user_uid = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)

    class Meta:
        model = CommentModel
        fields = ('comment', 'id', 'goodbad', 'picture_id', 'picture', 'user_uid', )
        read_only_fields = ('id', 'picture')
    
    def create(self, validated_data):
        validated_data['picture'] = validated_data.get('picture_id', None)
        validated_data['user'] = validated_data.get ('user_uid', None)
        if validated_data['picture'] is None:
            raise serializers.ValidationError('picture not found.:イラストが見つかりません')
        elif validated_data['user'] is None:
            raise serializers.ValidationError('User not found.: ユーザーが見つかりません')
        del validated_data['picture_id']
        del validated_data['user_uid']

        return CommentModel.objects.create(**validated_data)


class RandomQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomQuestionModel
        fields = ('question', 'id',)
        read_only_fields = ('id',)


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('token',)