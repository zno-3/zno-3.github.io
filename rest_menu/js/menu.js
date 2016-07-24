$(document).ready(function(){
	/* Changing thedefault easing effect - will affect the slideUp/slideDown methods: */
	$.easing.def = "easeOutBounce";

	$('li.list-group-item').click(function(e){
		var dropDown = $(this).next();
		$('.dropdown').not(dropDown).slideUp('slow');

		dropDown.slideToggle('slow');

		$('.activ-list span').toggleClass('glyphicon-chevron-down');
		$('.activ-list span').toggleClass('glyphicon-chevron-up');
		$('.activ-list').not($(this)).toggleClass('activ-list');

		if($(this).hasClass('activ-list')){$('.activ-list span').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');}
		else{$('span', $(this)).addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');}

		$(this).toggleClass('activ-list');
			
			/* Preventing the default event (which would be to navigate the browser to the link's address) */
			e.preventDefault();
	})


	$(".food-item").click(function() {//POPUP
		$('#num_food').val('1');

		$('.food-thumb-modal').html('<img src="'+$('img', $(this)).attr('src')+'">');

		if($('#modal-massage-error').css('display') == 'block'){
			$('#modal-massage-error').css('display', 'none');
			$('.input-num-food').css('boxShadow', 'none');}

	    $("#myModalBox").modal('show');

	    $(".food-name-modal").text($( ".food-name", $(this)).text());
	    $(".unit-price-modal").text($( ".food-price", $(this)).text().substring(1));
		$(".total-price-modal").text($( ".food-price", $(this)).text().substring(1));
	});

	$("#hi_food_btn").click(function() {//hi num
			var num = $("#num_food").val()*1+1;
	    	$("#num_food").val(num);
	    	$(".total-price-modal").text(($(".unit-price-modal").text()*num).toFixed(2));
	});
		
	$("#low_food_btn").click(function() {//low num

		if($("#num_food").val() > 1){
			var num = $("#num_food").val()*1-1;
			$("#num_food").val(num);
	    	$(".total-price-modal").text(($(".unit-price-modal").text()*num).toFixed(2));
		}
	});




$(".add-to-cart").click(function() {

	if($('#num_food').val()>0){


		$('.cart_tr').append('<div class="cart_item">\
			<div class="cart_td_name">'+$('.food-name-modal').text()+'</div>\
			<div class="cart_td_num">'+$('#num_food').val()+'</div>\
			<div class="cart_td_price">$'+($('.total-price-modal').text()*1).toFixed(2)+'</div>\
		    <div class="cart_td_del" onClick="delFood(this)"><span class="glyphicon glyphicon-trash"></span></div>\
		        </div>');

		pricing () ;


		$('.close-modal').click();
	}
else{
	$('#modal-massage-error').text('Please enter the number of servings is more than zero.').css('display', 'block');
	$('.input-num-food').css('boxShadow', '0 0 3px 1px #b94a48');}
	});
	
});

function delFood(delBox){
	$(delBox).parent().remove();
	pricing () ;
}

function pricing () {
	var total = 0;
		var cur_price = 0;
		for(i=0; i < $('.cart_tr .cart_td_price').length; i++){
			cur_price = $($('.cart_tr .cart_td_price')[i]).text().substring(1);
			total = total + cur_price*1;
		}
		$('.cart_total_price span').text('$'+total.toFixed(2));

		if($('.cart_tr').length>0){
			$('.cart_tr_top').css('display', 'block');
			$('.cart_total_price').css('display', 'block');
		}
		else{$('.cart_tr_top').css('display', 'none');
			$('.cart_total_price').css('display', 'none');}
}