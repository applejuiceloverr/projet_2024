from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import Account

class AccountAdmin(BaseUserAdmin):
    list_display = ('email', 'username', 'nom', 'prenom', 'is_admin', 'is_active', 'is_staff')
    list_filter = ('is_admin', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'nom', 'prenom')}),
        ('Permissions', {'fields': ('is_admin', 'is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'nom', 'prenom', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'username', 'nom', 'prenom')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)

admin.site.register(Account, AccountAdmin)
admin.site.unregister(Group)  # Optionally unregister Group if not used
