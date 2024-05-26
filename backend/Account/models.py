from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin 
from django.utils.crypto import get_random_string   
from django.db.models.signals import post_save
from django.dispatch import receiver
class MyAccountManager(BaseUserManager):
    def create_user(self, email, nom, prenom, password=None):
        if not email:
            raise ValueError("Users must have an email address.")
        if not nom:
            raise ValueError("Users must have a name.")
        if not prenom:
            raise ValueError("Users must have a first name.")
        
        user = self.model(
               email=self.normalize_email(email),
               nom=nom,
               prenom=prenom,
               username=self.normalize_email(email),  # Set username to email
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, nom, prenom,  password=None):
        user = self.create_user(
               email=self.normalize_email(email),
               nom=nom,
               prenom=prenom,
               password=password,
               username=self.normalize_email(email),  # Set username to email
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_sub = True
        user.save(using=self._db)
        return user
def get_unique_username():
    return get_random_string(length=32)

class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=32, unique=True)  # Removed default
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    is_sub = models.BooleanField(default=False)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        super().save(*args, **kwargs)



    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="account_set",
        related_query_name="account",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="account_set",
        related_query_name="account",
    )

    objects = MyAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nom', 'prenom']

    def __str__(self):
        return f"{self.email}, {self.nom}, {self.prenom}"

    def has_perm(self, perm, obj=None):
        if self.is_superuser:
            return True
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

@receiver(post_save, sender=Account)
def update_is_sub(sender, instance, created, **kwargs):
    if created and instance.stripe_customer_id:
        instance.is_sub = True
        instance.save()