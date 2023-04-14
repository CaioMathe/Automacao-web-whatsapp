from django.urls import path
from ..views.automacao import *
urlpatterns = [
     path('api/web/', AutoWeb.as_view(), name ='automacao'),
     path('api/search/', Search.as_view(), name ='busca_dados'),


]