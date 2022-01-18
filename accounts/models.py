from django.contrib.auth.models import UserManager, AbstractUser

class CustomUserManager(UserManager):
    use_in_migrations = True

    def _create_user(self, email, username, password, **extra_fields):
        if not username:
            raise ValueError('username must be set')
        if email:
            email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError('username must be set')

        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        return self._create_user(email, username, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fieldes):

        extra_fieldes.setdefault('is_staff', True)
        extra_fieldes.setdefault('is_superuser', True)

        if extra_fieldes.get('is_staff') is not True:
            raise ValueError('superuser must have is_staff = True')

        if extra_fieldes.get('is_superuser') is not True:
            raise ValueError('superuser must have is_superuser = True')

        return self._create_user(email, username, password, **extra_fieldes)


class CustomUser(AbstractUser):
    objects = CustomUserManager()

    def __str__(self):
        return self.username
