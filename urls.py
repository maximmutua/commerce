from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
import views  # Adjust this if views is in a different module

# Register API routes with the router
router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'orders', views.OrderViewSet)

# URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Include API routes
    path('register/', views.RegisterUser.as_view(), name='register_user'),  # Register user view
]
