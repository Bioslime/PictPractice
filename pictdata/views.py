from flask import Response
from itsdangerous import serializer
from .models import PictDataModel, CustomUser, RandomQuestionModel
from .serializers import PictSerializer, CustomuserSerializer, RandomQuestionSerializer
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class PictDataApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PictDataModel.objects.all()
    serializer_class = PictSerializer


class PictDataDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PictDataModel.objects.all()
    serializer_class = PictSerializer


class RandomQuestionsListApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = RandomQuestionModel.objects.all()
    serializer_class = RandomQuestionSerializer


class CustomUserApiView(generics.ListCreateAPIView):
    permission_class = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = CustomuserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




