import jdatetime
from project import settings
from django.db import models

from account.models import CustomUser


def current_time():
    return jdatetime.datetime.now(settings.DEFAULT_TZ).strftime("%Y-%m-%d %H:%M:%S")

class Diagram(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    url = models.CharField(max_length=100)
    create_datetime = models.DateTimeField(
        default=current_time
    )