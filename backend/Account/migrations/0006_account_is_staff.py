# Generated by Django 5.0.4 on 2024-06-15 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0005_account_stripe_customer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
