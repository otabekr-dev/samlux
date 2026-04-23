from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_main']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_main_image(self, obj):
        request = self.context.get("request")

        main = obj.images.filter(is_main=True).first()
        if main:
            return request.build_absolute_uri(main.image.url)

        first = obj.images.first()
        if first:
            return request.build_absolute_uri(first.image.url)

        return request.build_absolute_uri("/media/products/product.png")