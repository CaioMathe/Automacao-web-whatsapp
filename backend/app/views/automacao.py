from selenium import webdriver
from rest_framework.views import APIView
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from rest_framework.response import Response
from rest_framework import status
import time
import re



def remove_emojis(data):
    emoj = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002500-\U00002BEF"  # chinese char
        u"\U00002702-\U000027B0"
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001f926-\U0001f937"
        u"\U00010000-\U0010ffff"
        u"\u2640-\u2642" 
        u"\u2600-\u2B55"
        u"\u200d"
        u"\u23cf"
        u"\u23e9"
        u"\u231a"
        u"\ufe0f"  # dingbats
        u"\u3030"
                      "]+", re.UNICODE)
    return re.sub(emoj, '', data)

class AutoWeb(APIView):
    def post(self, request):
        # try:
        data = request.data
        print(data)
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        navegador = webdriver.Chrome(options=options)
        navegador.get('https://web.whatsapp.com/')
        while len(navegador.find_elements(By.ID, 'side')) < 1:
            time.sleep(1)
        for name in data['contatos']:
            navegador.find_element(By.XPATH, '//*[@id="side"]/div[1]/div/div/div[2]/div/div[1]/p').send_keys(f"{name}")
            time.sleep(1)
            navegador.find_element(By.CSS_SELECTOR, value=f'[title*="{name}"]').click()
            time.sleep(1)
            navegador.find_element(By.XPATH,'//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[1]/p').send_keys(f""" {str(data['mensagem']).replace('[name]', f'{name}')} """)
            time.sleep(1)
            navegador.find_element(By.XPATH,'//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[2]/button').send_keys(Keys.ENTER)
            time.sleep(5)
        navegador.close()
        return Response("Finalizado com sucesso!", status.HTTP_200_OK)
        # except:
        #     return Response("Erro", status.HTTP_400_BAD_REQUEST)





