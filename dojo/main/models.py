# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add custom fields here
    profile = models.CharField(max_length=180)
    rank = models.CharField(max_length=64)
    

class UserPortfolio(models.Model):
    user = models.CharField(max_length=24)
    cryptocurrency = models.CharField(max_length=5)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "cryptocurrency": self.cryptocurrency,
            "quantity": self.quantity,
            "timestamp": self.timestamp
        }

class Trades(models.Model):
    trade_type = models.CharField(max_length=5)
    currency = models.CharField(max_length=5)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.TimeField()

    

