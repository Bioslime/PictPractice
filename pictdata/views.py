from django.test import RequestFactory
from .models import PictDataModel, CustomUser, RandomQuestionModel, CommentModel
from .serializers import PictSerializer, CustomuserSerializer, PictDetailSerializer,RandomQuestionSerializer, CommentsSerializer, TestSerializer
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response


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


class TestApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        print(request.headers)
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        response = {'user_uid': request.user.id}
        return Response(response, status=status.HTTP_200_OK)


class HelloWorldAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, forma=None):
        print(request.headers)
        return Response(data={"greeting":"Hello World!"}, status=status.HTTP_200_OK)
        







