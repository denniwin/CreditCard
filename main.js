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
    // $('.is_new').removeClass('is_new')
    $(this).parent().find('.button_cancel').toggleClass('button_cancel__off')
    $(this).parent().find('.inputvalue').toggleClass('inputvalue__open')
    $(this).parent().find('.button_ok').toggleClass('button_settings')
    $(this).parent().find('.number__off').toggleClass('number').text($(this).parent().find('#cardcode').val())
    $(this).parent().find('.cardholder__off').toggleClass('cardholder').text($(this).parent().find('#cardname').val())
    $(this).parent().find('.validdate__off').toggleClass('validdate').text($(this).parent().find('#carddate').val())
})

//Отмена значений
$('.button_cancel').click(function(e){e.preventDefault()
    $(this).parent().find('.test1').val('')
    // $(this).parent().find('.button_cancel').toggleClass('button_cancel__off')
    // $(this).parent().find('.inputvalue').toggleClass('inputvalue__open')
    // $(this).parent().find('.button_ok').toggleClass('button_settings')
    // $(this).parent().find('.number__off').toggleClass('number')
    // $(this).parent().find('.cardholder__off').toggleClass('cardholder')
    // $(this).parent().find('.validdate__off').toggleClass('validdate')
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
    alert ('Для продолжения сохраните карту')
})

// Удаление карты(тест-ок)
$('#clear').click(function(e) {e.preventDefault()
    if ($('.card').length >1) {
        $(".card:last-child").detach();	
    } else 
    alert ('Оставьте одну карту для редактирования')
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
    if ($(target).parent().find('#cardcode').val().length==19) {
        $(target).parent().parent().parent().find('#carddate').focus()
        console.log('ok3') 
    }
    else
    {console.log('notok3')  }
}

$(function($){
	$('#cardcode').on('input', function(e){
        digits_int(this)
        numer = $(this).val().replace(" ", "");
        if (numer.length > 5) { 
            let cardInfo = new CardInfo(numer, {
                banksLogosPath: './node_modules/card-info/dist/banks-logos/',
                brandsLogosPath: './node_modules/card-info/dist/brands-logos/'
            })
            console.log(numer)
            console.log(cardInfo.bankName)
            console.log(cardInfo.bankLogo)
            console.log(cardInfo.backgroundColor)
            document.querySelector('.card').style.background = cardInfo.backgroundColor
            $('.alfa').css('background-image', 'url(' + cardInfo.bankLogo + ')');

        }
        else 
        document.querySelector('.card').style.background = 'black'
        $('.alfa').css('background-image', 'url(' + 124 + ')');
	});
});

//Запрос на сервер
$(function($){
	$('#cardcode').on('input',function(e){
                $.ajax({
                    url: 'https://testedu.rfixit.ru/valid.php',         /* Куда пойдет запрос */
                    method: 'post',                                     /* Метод передачи (post или get) */
                    dataType: 'html',                                   /* Тип данных в ответе (xml, json, script, html). */
                    data: {card: $(this).parent().find('#cardcode').val()},  
                        success: function(data){                         /* функция которая будет выполнена после успешного запроса.  */ 
                        if (data == 'error') {
                        console.log('Проверьте корректность ввода номера карты') 
                        $('#cardcode').parent().parent().parent().find('.button_ok').addClass('no__valid') 
                        }          
                        else {$('#cardcode').parent().parent().parent().find('.button_ok').removeClass('no__valid')
                        console.log('GOOD')  
                        }
                    }
                });
	});
});


//Проверка символов в инпутах (на проверке)
function checknum(check){
    val = $(check).val();
    val = val !=0 ? $(check).parent().parent().parent().find('.button_cancel').removeClass('button_cancel__off') : $(check).parent().parent().parent().find('.button_cancel').addClass('button_cancel__off');
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
    if ($(target).parent().find('#carddate').val().substring(3,5) < 50 &&
    $(target).parent().find('#carddate').val().substring(3,5) > 22 &&
    $(target).parent().find('#carddate').val().substring(0,2) < 13 &&
    $(target).parent().find('#carddate').val().substring(0,2) > 0 && 
    $(target).parent().parent().parent().find('#carddate').val().length ==5) {
    $(target).parent().parent().parent().find('#cardname').focus()
    }
    else
    {
        console.log($(target).parent().find('#carddate').val().substring(0,2))
        console.log($(target).parent().find('#carddate').val().substring(3,5))
        console.log($(target).parent().parent().parent().find('#carddate').val().length)
        console.log('Проверьте дату')}
}

$(function($){
	$('#carddate').on('input', function(e){
    digits_int_date(this) //на тестировании
	});
});

//Валидация имени и фамилии 
function digits_int_name(target){
    val = $(target).val().replace(/[^A-Z\s]+/ig, '').substring(0,30);
	$(target).val(val);
    if ($(target).parent().find('#cardname').val().length==3) {
        console.log('ok2') 
    }
    else
    {console.log('notok2')}
}

$(function($){
	$('#cardname').on('input', function(e){
		digits_int_name(this);
	});
});

});