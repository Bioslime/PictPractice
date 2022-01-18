from django.urls import path
from . import views

app_name = 'pictdata'
urlpatterns=[
    path('pictdata/', views.PictDataApiView.as_view(), name='pictdata')
]