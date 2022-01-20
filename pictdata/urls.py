from django.urls import path
from . import views

app_name = 'pictdata'
urlpatterns=[
    path('picture/', views.PictDataApiView.as_view(), name='pictlist'),
    path('picture/<uuid:pk>', views.PictDataDetailApiView.as_view(), name='pictdetail'),
]