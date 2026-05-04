from django.contrib import admin
from django.utils.html import format_html
from .models import Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'is_main', 'image_preview']
    readonly_fields = ['image_preview']


    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="80" height="80" style="object-fit:cover; border-radius:6px;">', obj.image.url)
        return 'Rasm yo\'q'
    image_preview.short_description = 'Ko\'rinish'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_active', 'image_preview', 'created_at']
    list_filter = ['is_active', 'category']
    search_fields = ['name', 'short_description']
    list_editable = ['is_active', 'price']
    prepopulated_fields = {'slug':('name',)}
    inlines = [ProductImageInline]
    ordering = ['-created_at']
    actions = ['make_active', 'make_inactive']


    def image_preview(self, obj):
        main_image = obj.images.filter(is_main=True).first() or obj.images.first()
        if main_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit:cover; border-radius:6px;" />', main_image.image.url)
        return '-'
    image_preview.short_description = 'Rasm'


    def make_active(self, request, queryset):
        queryset.update(is_active=True)
    make_active.short_description = 'Tanlangan mahsulotlarni faollashtirish'


    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)
    make_inactive.short_description = 'Tanlangan mahsulotlarni o\'chirish'

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'is_main', 'image_preview']
    list_filter = ['is_main']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="60" height="60" style="object-fit:cover; border-radius:6px;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Rasm'                