# Generated by Django 5.0.4 on 2024-05-11 03:09

import Account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0002_account_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='username',
            field=models.CharField(default=Account.models.get_unique_username, max_length=32, unique=True),
        ),
    ]
