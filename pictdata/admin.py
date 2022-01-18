from django.contrib import admin
from .models import PictDataModel, CommentModel, RandomQuestionModel

admin.site.register(PictDataModel)
admin.site.register(CommentModel)
admin.site.register(RandomQuestionModel)

# Register your models here.
