
//Дата время(тест-ок)
jQuery(function($) {
    setInterval(function() {
    var Months = ['январь', 'февраль', 'Мартик', 'Апрель']
    var date = new Date()  
    var m = Months[date.getMonth()]
    time = date.toLocaleTimeString();
    $(".date").text(`Сейчас ${time}, ${date.getDate()} ${m} ${date.getFullYear()} года`);
    });
});

//Редактировать карту
$('.button_okk, .button_settings').click(function(e) {e.preventDefault()
    $(this).parent().find('.button_cancel').toggle(100)
    $(this).parent().find('.inputvalue').toggleClass('inputvalue__off')
    $(this).parent().find('.button_settings').toggleClass('button_okk')
    $(this).parent().find('.number__off').toggleClass('number').text(( $(this).parent().find('#cardcode').val()))
    $(this).parent().find('.cardholder__off').toggleClass('cardholder').text(( $(this).parent().find('#cardname').val()))
    $(this).parent().find('.validdate__off').toggleClass('validdate').text(( $(this).parent().find('#carddate').val()))
})

//Очистка содержимого(тест-ок)
$('.button_cancel').click(function(e){e.preventDefault()
    $(this).parent().find('#cardcode').val('')
    $(this).parent().find('#cardholder').val('')
    $(this).parent().find('#carddate').val('')
});

//Клонирование карты(тест-ок)
$('#add').click(function(e) {e.preventDefault()
    $('.card').parent().find('#cardcode').val('')
    $('.card').parent().find('#cardholder').val('')
    $('.card').parent().find('#carddate').val('')
    $(".card").clone(true).appendTo(".wrapper");
})

// Удаление карты(тест-ок)
$('#clear').click(function(e) {e.preventDefault()
    if ($('.card').length >1) {
        $(".card:last-child").detach();	
        console.log($('.card').length)
    } else 
    alert ('Оставьте одну карту для редактирования')
})

//Только заглавные(тест-ок)
$('#cardname').bind('input', function(){
	$(this).val($(this).val().toUpperCase());
});

//Валидация ввода номера карты(тест-ок)
function digits_int(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,16);
    val = val != '' ? val.match(/.{1,4}/g).join(' ') : '';
	$(target).val(val);
}

$(function($){
	$('#cardcode').on('keyup keypress blur change', function(e){
		digits_int(this);
	});
	digits_int('#cardcode');
});

//Валидация срока действия карты(тест-ок)
function digits_int_date(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,4);
    val = val != '' ? val.match(/.{1,2}/g).join('/') : '';
	$(target).val(val);
}

$(function($){
	$('#carddate').on('keyup keypress blur change', function(e){
		digits_int_date(this);
	});
	digits_int_date('#carddate');
});

//Валидация имени и фамилии 
function digits_int_name(target){
    val = $(target).val().replace(/[^A-Z\s]+/ig, '').substring(0,30);
	$(target).val(val);
}

$(function($){
	$('#cardname').on('keyup keypress blur change', function(e){
		digits_int_name(this);
	});
	digits_int_name('#cardname');
});


// //Маска номера карты
// for (var i in ['input', 'change', 'blur', 'keyup']) {
//     cardcode.addEventListener('input', formatCardCode, false);
// }

// function formatCardCode() {
//     let cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
//     cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
//     this.value = cardCode;
//	val = $(target).val().replace(/[^0-9]/g, '');
//	val = val.replace(/B(?=(d{3})+(?!d))/g, ' ');

//     myform.number.value=this.value.split(" ").join("");
// }


// //Маска срока действия
// for (var i in ['input', 'change', 'blur', 'keyup']) {
//     carddate.addEventListener('input', formatcarddate, false);
// }

// function formatcarddate() {
//     var carddate = this.value.replace(/[^\d]/g, '').substring(0,4);
//     carddate = carddate != '' ? carddate.match(/.{1,2}/g).join('/') : '';
//     this.value = carddate;
//     myform.number.value=this.value.split(" ").join("");
// }

// //Маска имя пользователя
// for (var i in ['input', 'change', 'blur', 'keyup']) {
//     cardname.addEventListener('input', formatcardname, false);
// }

// function formatcardname() {
//     var cardname = this.value.replace(/[^A-Z\s]+/ig, '').substring(0,30);
//     this.value = cardname;
//     myform.number.value=this.value.split(" ").join("");
// }

//Двойной клик по полю номера, в разработке
// $('.number__off, .number').on('dblclick', function() {
//     $('#cardcode').toggle()
//     $('.button_settings').toggleClass('button_okk')
//     $('.number__off').toggleClass('number')
//     $('.validdate__off').toggleClass('validdate')
//     $('.cardholder__off').toggleClass('cardholder')
//     $('.number__off').text(($('#cardcode').val()))
//     $('.cardholder__off').text(($('#cardname').val()))
//     $('.validdate__off').text(($('#carddate').val())) 
// })



//Применить изменения в резерв





//Добавить имя владельца
$('#btn_add_cardname').click(function(e){e.preventDefault()
	$('.cardholder').text(($('#cardname').val()))
});

//Добавить срок действия
$('#btn_add_date').click(function(e){e.preventDefault()
	$('.validdate').text(($('#carddate').val()))
});

// Кнопка очистки всех значений
$('').click(function(e){e.preventDefault()
    $('.inputvalue').toggleClass('inputvalue__off').slideToggle()   
});



//Факультатив

// result=[]
// start = 250
// for (i=10;i<=start;i*=10) {
//     result.push(Math.floor(start/i)
//     )
// }
// result
// (2) [25, 2]
// result=[]
// start = 25025648
// for (i=10;i<=start;i*=10) {
//     result.push(Math.floor(start/i)
//     )
// }
// result
// (7) [2502564, 250256, 25025, 2502, 250, 25, 2]0: 25025641: 2502562: 250253: 25024: 2505: 256: 2length: 7[[Prototype]]: Array(0)
// result={}
// start = 25025648
// for (i=10;i<=start;i*=10) {
//     result.push(Math.floor(start/i)
//     )
// }
// result
// let sum = 0;

// while (true) {

//   let value = +prompt("Введите число", '');

//   if (!value) break; // (*)

//   sum += value;

// }
// alert( 'Сумма: ' + sum );


// VM1073:6 Uncaught SyntaxError: Unexpected token ')'
// result={}
// start = 25025648
// for (i=10;i<=start;i*=10) {
//     result[i] = Math.floor(start/i)

// }
// result
