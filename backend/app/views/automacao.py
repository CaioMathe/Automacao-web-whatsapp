from selenium import webdriver
from rest_framework.views import APIView
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..serializers import MensagemSerializer
from ..models import Mensagem, User
import time

class AutoWeb(APIView):
    permission_classes = [IsAuthenticated]  
    def post(self, request):
        try:
            data = request.data
            if(Mensagem.objects.filter(mensagem = data['mensagem']).exists() == False):
                Mensagem.objects.create(
                    mensagem=data['mensagem'],
                    id_user = User.objects.get(id = self.request.user.id)
                ) 
            options = webdriver.ChromeOptions()
            options.add_experimental_option('excludeSwitches', ['enable-logging'])
            navegador = webdriver.Chrome(options=options)
            navegador.get('https://web.whatsapp.com/')
            while len(navegador.find_elements(By.ID, 'side')) < 1:
                time.sleep(1)
            navegador.minimize_window()
            for name in data['contatos']:
                navegador.find_element(By.XPATH, '//*[@id="side"]/div[1]/div/div/div[2]/div/div[1]/p').send_keys(f"{name}")
                time.sleep(1)
                navegador.find_element(By.XPATH, '//*[@id="side"]/div[1]/div/div/div[2]/div/div[1]/p').send_keys(Keys.ENTER)
                time.sleep(1)
                navegador.find_element(By.XPATH,'//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]/p').send_keys(f""" {str(data['mensagem']).replace('[name]', f'{name}')} """)
                time.sleep(1)
                navegador.find_element(By.XPATH,'//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[2]/button').send_keys(Keys.ENTER)
                time.sleep(5)
            navegador.close()
            return Response("Finalizado com sucesso!", status.HTTP_200_OK)
        except:
            return Response("Erro", status.HTTP_400_BAD_REQUEST)



class Search(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        try:
            result = Mensagem.objects.filter(id_user=request.user.id).values('id', 'mensagem')

        except:
            return Response('Erro', status=status.HTTP_410_GONE)
         
        # retorna JSON + HTTP 200
        return Response(result, status=status.HTTP_200_OK)

