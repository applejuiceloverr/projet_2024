# Generated by Django 5.0.4 on 2024-05-11 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='username',
            field=models.CharField(default='default_username', max_length=255, unique=True),
            preserve_default=False,
        ),
    ]