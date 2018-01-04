from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import time
from .models import Profile
from .forms import SignUpForm
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings
from .tokens import account_activation_token
from django.utils.encoding import force_bytes, force_text


# View for Login
def LoginView(request):
    # time.sleep(10)
    # Checking post request
    if request.method == "POST":
        if request.POST.get("Login") is not None:
            # time.sleep(5)
            username = request.POST.get('username')
            password = request.POST.get('password')
            # Lets authenticate the user
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
            else:
                return HttpResponse("error")
                # if user.is_active:
                return HttpResponse("success")
                #     login(request, user)
                # else:
                #     return HttpResponse(
                #         "HOmework : response via ajax message is please activate activation\
                #          link is already sent to your account")
    return redirect("/")


# Views to process submitted profile data
def ProfileProcess(request):
    time.sleep(10)
    if request.method == "POST":
        profileImage = request.FILES.get('profileImage')
        name = request.POST.get('name')
        title = request.POST.get('title')
        address = request.POST.get('address')
        email = request.POST.get('email')
        phone = request.POST.get('phone')

        profile = Profile.objects.get(user=request.user)

        if profileImage is not None:
            profile.image = profileImage
        if name is not None:
            profile.name = name
        if name is not None:
            profile.title = title
        if address is not None:
            profile.address = address
        if email is not None:
            profile.email = email
        if phone is not None:
            profile.phone = phone
        profile.first_edit = False
        try:
            profile.save()
        except Exception as e:
            print(e)

        print(request.POST)
        print(request.FILES)
        return HttpResponse("hihihi")
    return redirect("/")


def LogoutView(request):
    logout(request)
    return redirect("/")


@login_required
def EditView(request):
    profile = Profile.objects.get(user=request.user)
    context = {}
    if not profile.first_edit:
        context['image'] = profile.image
        context['edited'] = True
        context['name'] = profile.name
        context['title'] = profile.title
        context['address'] = profile.address
        context['email'] = profile.email
        context['phone'] = profile.phone
    else:
        context['edited'] = False
    return render(request, 'login/edit.html', context)


def RegView(request):
    # time.sleep(5)
    if request.method == "POST":
        signup = SignUpForm(request.POST)
        if signup.is_valid():
            print("valid")
            user = signup.save(commit=False)
            user.is_active = False
            user.save()

            current_site = get_current_site(request)
            subject = 'Acitvate Your inAR Account'
            message = render_to_string(
                'login/account_activation_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                })
            EMAIL_TO = [request.POST['email']]
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                EMAIL_TO,
                fail_silently=False)

        # print(signup)
        # username = request.POST.get("id_username")
        # email = request.POST.get('email')
        # password = request.POST.get('id_password1')
        # print(request.POST)

        return HttpResponse("success")


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return render(request, 'login/activated.html')
    else:
        return render(request, 'login/account_activation_invalid.html')


def FrontPageView(request):
    # time.sleep(5)
    signUpForm = SignUpForm(request.POST)
    if request.method == "POST":
        if request.POST.get("type") is not None:
            if request.POST.get("type") == "check_user_exist":
                user = User.objects.filter(
                    username=request.POST.get("username")).first()
                if user is not None:
                    return HttpResponse("exists")
                else:
                    return HttpResponse("notexists")
            else:
                return HttpResponse("type not matched")
    context = {
        'signUpForm': signUpForm,
    }
    return render(request, 'login/home.html', context)
