from django.urls import path
from . import views

urlpatterns=[
    path('picture/', views.PictDataApiView.as_view()),
    path('picture/compare/', views.ComparePictDataApiView.as_view()),
    path('picture/<uuid:pk>', views.PictDataDetailApiView.as_view()),
    path('questions/', views.RandomQuestionsListApiView.as_view()),
    path('user/', views.CustomUserApiView.as_view()),
    path('comment/', views.CommntApiView.as_view()),
    path('test/', views.TestApiView.as_view()),
    path('hello/', views.HelloWorldAPI.as_view()),
]