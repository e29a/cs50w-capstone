# Generated by Django 4.2.6 on 2023-10-05 12:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0002_trades_userportfolio_remove_customuser_date_of_birth_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="userportfolio",
            name="timestamp",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]