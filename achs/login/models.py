from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save


# Where should i save
def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "%s.%s" % (instance.user.username, "jpg")


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, upload_to=user_directory_path)
    name = models.CharField(max_length=100, blank=False)
    title = models.CharField(max_length=100, blank=False)
    address = models.CharField(max_length=200, blank=False)
    email = models.EmailField(max_length=50, blank=False)
    phone = models.CharField(max_length=20, blank=False)
    created_at = models.DateTimeField(default=timezone.now)
    first_edit = models.BooleanField(default=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=User, dispatch_uid='save_new_user_profile')
def save_profile(sender, instance, created, **kwargs):
    user = instance
    if created:
        profile = Profile(user=user)
        profile.save()
