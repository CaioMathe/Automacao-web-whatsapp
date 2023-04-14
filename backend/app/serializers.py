from rest_framework import serializers
from .models import User, Mensagem
from rest_framework.validators import ValidationError

class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model= User
        fields = ['email', 'username', 'password']

    def validate(self, attrs):
        email_exists=User.objects.filter(email=attrs['email']).exists()
        if email_exists:
            raise ValidationError('Email já exite')
        return super().validate(attrs)
    
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        
        return user
    
class MensagemSerializer(serializers.ModelSerializer):
    # id_user = User()
    class Meta:
        model= Mensagem
        fields = ['id', 'mensagem']