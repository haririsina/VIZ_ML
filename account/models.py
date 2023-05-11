from django.db import models
from django.contrib.auth.models import AbstractUser
from project import settings
import jdatetime


def current_time():
    return jdatetime.datetime.now(settings.DEFAULT_TZ).strftime("%Y-%m-%d %H:%M:%S")

class CustomUser(AbstractUser):
    username = None
    date_joined = models.DateTimeField(
        default=current_time
    )
    email = models.EmailField('email adress', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["first_name", "last_name"]