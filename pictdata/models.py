
from pyexpat import model
from django.db import models
from django.utils import timezone

import uuid

import sys
sys.path.append("../")
from accounts.models import CustomUser


def image_directory_path(instance, filename):
    return 'image/{}.{}'.format(str(uuid.uuid4()), filename.split('.')[-1])


class PictDataModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to=image_directory_path)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    date = models.DateTimeField(default=timezone.now)
    another_pict = models.ForeignKey('self', blank=True, null=True, default=None, on_delete=models.SET_NULL)
    
    def __str__(self):
        return self.title


class CommentModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    picture = models.ForeignKey(PictDataModel, on_delete=models.CASCADE)
    comment = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    another_comment = models.ForeignKey('self', blank=True, null=True, default=None, on_delete=models.CASCADE)
    goodbad = models.BooleanField(default=None)

    def __str__(self):
        return self.comment


class RandomQuestionModel(models.Model):
    question = models.CharField(max_length=100)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    def __str__(self):
        return self.question
