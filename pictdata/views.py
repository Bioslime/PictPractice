from flask import Response
from itsdangerous import serializer
from .models import PictDataModel, CustomUser, RandomQuestionModel, CommentModel
from .serializers import PictSerializer, CustomuserSerializer, PictDetailSerializer,RandomQuestionSerializer, CommentsSerializer
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class PictDataApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PictDataModel.objects.all()
    serializer_class = PictSerializer


class PictDataDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PictDataModel.objects.all()
    serializer_class = PictDetailSerializer


class RandomQuestionsListApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = RandomQuestionModel.objects.all()
    serializer_class = RandomQuestionSerializer


class CustomUserApiView(generics.ListCreateAPIView):
    permission_class = [permissions.AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomuserSerializer


class CommntApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CommentsSerializer
    queryset = CommentModel.objects.all()





