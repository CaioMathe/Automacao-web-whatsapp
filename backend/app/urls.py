from django.urls import path
from .views import auth
urlpatterns = [
     path('home/', auth.HomeView.as_view(), name ='home'),
     path('logout/', auth.LogoutView.as_view(), name ='logout'),
     path('create/', auth.SingUp.as_view(), name ='SingUp'),

]