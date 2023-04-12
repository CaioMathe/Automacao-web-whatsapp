from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, generics
from ..serializers import SignUpSerializer


class HomeView(APIView):
     permission_classes = [IsAuthenticated]
     def get(self, request):
          content = {'message': f'Olá Seja Bem-vindo {request.user}'}
          return Response(content)
     
class SingUp(APIView):
     serializer_class = SignUpSerializer

     def post(self,request):
          data =  request.data
          serializer = self.serializer_class(data=data)

          if serializer.is_valid():
               serializer.save()
               return Response(serializer.data, status=status.HTTP_201_CREATED)
          
          return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)