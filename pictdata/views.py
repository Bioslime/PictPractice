from .models import PictDataModel, CustomUser, RandomQuestionModel, CommentModel
from .serializers import PictSerializer, CustomuserSerializer, PictDetailSerializer,RandomQuestionSerializer, CommentsSerializer, TestSerializer, ComparePictSerializer
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class PictDataApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PictDataModel.objects.all()
    serializer_class = PictSerializer

    def get_queryset(self):
        pk = self.request.user.pk
        queryset = self.queryset.filter(user=pk)
        return queryset


class ComparePictDataApiView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PictDataModel.objects.all()
    serializer_class = ComparePictSerializer


class PictDataDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PictDataModel.objects.all()
    serializer_class = PictDetailSerializer


class RandomQuestionsListApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = RandomQuestionModel.objects.all()
    serializer_class = RandomQuestionSerializer


class CustomUserApiView(generics.ListCreateAPIView):
    permission_class = [permissions.AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomuserSerializer


class CommntApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentsSerializer
    queryset = CommentModel.objects.all()


class TestApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        response = {'user_uid': request.user.id}
        return Response(response, status=status.HTTP_200_OK)


class HelloWorldAPI(APIView):
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, forma=None):
        return Response(data={"greeting":"Hello World!"}, status=status.HTTP_200_OK)
        







