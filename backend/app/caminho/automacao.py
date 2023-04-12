from django.urls import path
from ..views.automacao import *
urlpatterns = [
     path('api/web/', AutoWeb.as_view(), name ='automacao'),

]