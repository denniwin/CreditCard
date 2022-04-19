$(function(){ // jQuery document ready сокращенный вариант

//Дата время(тест-ок)
$(function(){
    setInterval(function() {
    var date = new Date()  
    time = date.toLocaleTimeString();
    $(".hour").text(`${time}`);
    $(".date").text(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
    });
});

//Транслитерация, тестовый вариант
function translit(word){
	var answer = '';
	var converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya',
 
		'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
		'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
		'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
		'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
		'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
		'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
		'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
	};
 
	for (var i = 0; i < word.length; ++i ) {
		if (converter[word[i]] == undefined){
			answer += word[i];
		} else {
			answer += converter[word[i]];
		}
	}
 
	return answer;
}

$('#cardname').on('input', function(){
	$(this).val(function(i, val){
		return translit(val);
	});
 
	return false;
});

//Применить изменения
$('.button_ok').click(function(e) {e.preventDefault()
    if ($(this).hasClass('no__valid')) {
alert('Карта не валидна')
        return
    } else
    $('.is_new').removeClass('is_new')
    $(this).parent().find('.button_cancel').toggleClass('button_cancel__off')
    $(this).parent().find('.inputvalue').toggleClass('inputvalue__open')
    $(this).parent().find('.button_ok').toggleClass('button_settings')
    $(this).parent().find('.number__off').toggleClass('number').text($(this).parent().find('#cardcode').val())
    $(this).parent().find('.cardholder__off').toggleClass('cardholder').text($(this).parent().find('#cardname').val())
    $(this).parent().find('.validdate__off').toggleClass('validdate').text($(this).parent().find('#carddate').val())
})

$('.button_cancel').click(function(e){e.preventDefault()
    $(this).parent().find('.test1').val('')
    $(this).parent().find('.button_cancel').toggleClass('button_cancel__off')
    $(this).parent().find('.inputvalue').toggleClass('inputvalue__open')
    $(this).parent().find('.button_ok').toggleClass('button_settings')
    $(this).parent().find('.number__off').toggleClass('number')
    $(this).parent().find('.cardholder__off').toggleClass('cardholder')
    $(this).parent().find('.validdate__off').toggleClass('validdate')
});

//Клонирование карты c пустыми значениями(тест-ок)
$('#add').click(function(e) {e.preventDefault()
    if ($('.is_new').length == 0) {
        $('.card:first-child').clone(true).appendTo(".wrapper");
        $('.card:last-child').addClass('is_new')
        $('.card:last-child').find('.test1').val('')
        $('.card:last-child').find('.number__off').text('')
        $('.card:last-child').find('.validdate__off').text('')
        $('.card:last-child').find('.cardholder__off').text('');
        $('.card:last-child').find('.inputvalue__open').removeClass().addClass('inputvalue')
        $('.card:last-child').find('.button_ok, button_settings').removeClass().addClass('button_ok')
        $('.card:last-child').find('.button_cancel, button_cancel__off').removeClass().addClass('button_cancel')
        $('.card:last-child').find('.number__off, number').removeClass().addClass('number__off')
        $('.card:last-child').find('.validdate__off, validdate').removeClass().addClass('validdate__off')
        $('.card:last-child').find('.cardholder__off, cardholder').removeClass().addClass('cardholder__off')
    } else 
    alert ('Сохраните карту')
})

// Удаление карты(тест-ок)
$('#clear').click(function(e) {e.preventDefault()
    if ($('.card').length >1) {
        $(".card:last-child").detach();	
    } else 
    alert ('Оставьте одну карту для редактирования')
})

$('#check').click(function(e) {e.preventDefault()
    // if ($('.card').length >1) {
    //     $(".card:last-child").detach();	
    // } else 
    // alert ('Оставьте одну карту для редактирования')
    console.log($('.button_ok').parent().find('#cardcode').val())
})

//Только заглавные(тест-ок)
$('#cardname').on('input', function(){
	$(this).val($(this).val().toUpperCase());
});

//Валидация ввода номера карты(тест-ок)
function digits_int(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,16);
    val = val != '' ? val.match(/.{1,4}/g).join(' ') : '';
	$(target).val(val);
}

$(function($){
	$('#cardcode').on('input', function(e){
		digits_int(this);
	});
});


$(function($){
	$('.button_ok').click(function(e){
                console.log($(this).parent().find('#carddate').val().substring(0,2))
            if ($(this).parent().find('#cardcode').val().length==19 && 
                $(this).parent().find('#carddate').val().substring(3,5) < 50 &&
                $(this).parent().find('#carddate').val().substring(3,5) > 22) {
                $.ajax({
                    url: 'https://testedu.rfixit.ru/valid.php',         /* Куда пойдет запрос */
                    method: 'post',             /* Метод передачи (post или get) */
                    dataType: 'html',          /* Тип данных в ответе (xml, json, script, html). */
                    data: {card: $(this).parent().find('#cardcode').val()},     /* Параметры передаваемые в запросе. */
                    success: function(data){   /* функция которая будет выполнена после успешного запроса.  */ 
                        if (data == 'error') {
                            $('.button_ok').removeClass('no__valid')
                        }          
                        else {
                            $('.button_ok').removeClass('no__valid')  
                        }
                    }
                });
            } else
            alert('НЕА')
	});
});




//Проверка символов в инпутах (на проверке)
function checknum(check){
    val = $(check).val();
    val = val !=false ? $(this).parent().find('.button_cancel').removeClass() : $(this).parent().find('.button_cancel').removeClass();
}

$(function($){
	$('.test1').on('input', function(e){
		checknum(this);
	});    
});

//Валидация срока действия карты(тест-ок)
function digits_int_date(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,4);
    val = val != '' ? val.match(/.{1,2}/g).join('/') : '';
	$(target).val(val);
}

$(function($){
	$('#carddate').on('input', function(e){
		digits_int_date(this);      
	});
});

//Валидация имени и фамилии 
function digits_int_name(target){
    val = $(target).val().replace(/[^A-Z\s]+/ig, '').substring(0,30);
	$(target).val(val);
}

$(function($){
	$('#cardname').on('input', function(e){
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
// 	val = $(target).val().replace(/[^0-9]/g, '');
// 	val = val.replace(/B(?=(d{3})+(?!d))/g, ' ');
//  myform.number.value=this.value.split(" ").join("");
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
// $(document).ready(function(){
//     $.ajax({
//         url: 'https://testedu.rfixit.ru/',         /* Куда пойдет запрос */
//         method: 'post',             /* Метод передачи (post или get) */
//         dataType: 'html',          /* Тип данных в ответе (xml, json, script, html). */
//         data: {T: 'Текст',TT:"RRRRRRRR"},     /* Параметры передаваемые в запросе. */
//         success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
//             alert(data);            /* В переменной data содержится ответ от index.php. */
//         }
//     });

// })
});