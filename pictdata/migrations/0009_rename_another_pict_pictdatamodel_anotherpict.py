# Generated by Django 3.2.9 on 2022-02-08 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pictdata', '0008_remove_randomquestionmodel_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pictdatamodel',
            old_name='another_pict',
            new_name='anotherPict',
        ),
    ]
