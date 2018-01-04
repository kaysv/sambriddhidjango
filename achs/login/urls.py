from django.conf.urls import url, include
from django.contrib import admin
from . import views

#this will help identify to which app the url is associated
app_name = 'login'

urlpatterns = [
    url(r'^$', views.FrontPageView, name='FrontPageView'),
    url(r'^login/$', views.LoginView, name='LoginView'),
    url(r'^logout/$', views.LogoutView, name='LogoutView'),
    url(r'^edit/$', views.EditView, name='EditView'),
    url(r'^registration/$', views.RegView, name='RegView'),
    url(r'^submitprofile/$', views.ProfileProcess, name='ProfileProcess'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate,
        name='activate'),
]
