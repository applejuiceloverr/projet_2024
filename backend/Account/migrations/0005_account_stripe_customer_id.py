# Generated by Django 5.0.4 on 2024-05-26 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0004_alter_account_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='stripe_customer_id',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
