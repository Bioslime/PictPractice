from .models import PictDataModel, CustomUser
from .serializers import PictSerializer, CustomuserSerializer
from rest_framework import generics
from rest_framework import permissions


class PictDataApiView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PictDataModel.objects.all()
    serializer_class = PictSerializer




