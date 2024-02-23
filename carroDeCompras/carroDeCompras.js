$(document).ready(function () {
    // Manejar cambios en la cantidad
    $('.quantity-input').on('input', function () {
        updateTotalPrice($(this));
    });

    // Función para actualizar el precio total
    function updateTotalPrice(inputElement) {
        var quantity = parseInt(inputElement.val());
        var pricePerUnit = parseFloat(inputElement.closest('.cart-item').find('.product-price').text().replace('$', ''));
        var totalPrice = quantity * pricePerUnit;

        // Actualizar el precio total en la interfaz
        inputElement.closest('.cart-item').find('.total-price').text('$' + totalPrice.toFixed(2));

        // Actualizar el precio total general
        updateCartTotal();
    }

    // Función para actualizar el precio total del carrito
    function updateCartTotal() {
        var totalAmount = 0;
        $('.total-price').each(function () {
            totalAmount += parseFloat($(this).text().replace('$', ''));
        });

        // Actualizar el precio total general en la interfaz
        $('.total-amount').text('$' + totalAmount.toFixed(2));
    }
});
