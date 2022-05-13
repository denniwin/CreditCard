$(function(){ // jQuery document ready сокращенный вариант

let valid_card

//Дата время(тест-ок)
$(function(){
    setInterval(function() {
    var date = new Date()  
    time = date.toLocaleTimeString();
    $(".hour").text(`${time}`);
    $(".date").text(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
    });
});

//Транслитерация
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
		return translit(val).toUpperCase();
	});
	return false;
});

//Применить изменения
$('.button_ok').click(function(e) {e.preventDefault()
    $(this).parent().find('.button_cancel').addClass('button_cancel__off')
    $(this).parent().find('.inputvalue').addClass('inputvalue__open')
    $(this).parent().find('.number__off').addClass('number').text($(this).parent().find('#cardcode').val())
    $(this).parent().find('.cardholder__off').addClass('cardholder').text($(this).parent().find('#cardname').val())
    $(this).parent().find('.validdate__off').addClass('validdate').text($(this).parent().find('#carddate').val())
    $(this).hide()
    $(this).parent().find('.button_settings').show()
})

//Вернуться к редактированию
$('.button_settings').click(function(e) {e.preventDefault()
    $(this).parent().find('.button_cancel').removeClass('button_cancel__off')
    $(this).parent().find('.inputvalue').removeClass('inputvalue__open')
    $(this).parent().find('.number__off, number').removeClass().addClass('number__off')
    $(this).parent().find('.validdate__off, validdate').removeClass().addClass('validdate__off')
    $(this).parent().find('.cardholder__off, cardholder').removeClass().addClass('cardholder__off')
    $(this).hide()
    $(this).parent().find('.button_ok').show()
})


//Отмена значений
$('.button_cancel').click(function(e){e.preventDefault()
    // $(this).parent().find('.test1').val('')
    $(this).parent().find('.button_cancel').addClass('button_cancel__off')
    $(this).parent().find('.inputvalue').addClass('inputvalue__open')
    $(this).parent().find('.button_ok').hide()
    $(this).parent().find('.button_settings').show()
    $(this).parent().find('.number__off').addClass('number')
    $(this).parent().find('.cardholder__off').addClass('cardholder')
    $(this).parent().find('.validdate__off').addClass('validdate')
});

//Клонирование карты c пустыми значениями(тест-ок)
$('#add').click(function(e) {e.preventDefault()
        if ( $('.card:last-child').find('#cardcode').val().length === 19 &&
        $('.card:last-child').find('#carddate').val().length === 5 &&
        $('.card:last-child').find('#cardname').val().length > 2 ) 
        {
        $('.card:first-child').clone(true).appendTo(".wrapper");
        $('.card:last-child').find('.test1').val('')
        $('.card:last-child').find('.number__off').text('')
        $('.card:last-child').find('.validdate__off').text('')
        $('.card:last-child').find('.cardholder__off').text('');
        $('.card:last-child').find('.button_ok').show().addClass('no__valid')
        $('.card:last-child').find('.button_settings').hide()
        $('.card:last-child').find('.inputvalue__open').removeClass().addClass('inputvalue')
        $('.card:last-child').find('.goodcard, valid_good').removeClass().addClass('goodcard')
        $('.card:last-child').find('.gooddate, valid_good').removeClass().addClass('gooddate')
        $('.card:last-child').find('.number__off, number').removeClass().addClass('number__off')
        $('.card:last-child').find('.validdate__off, validdate').removeClass().addClass('validdate__off')
        $('.card:last-child').find('.cardholder__off, cardholder').removeClass().addClass('cardholder__off')
        $('.card:last-child').css('background-color', '#0140ad')
        $('.card:last-child').find('.logo').css('background-image', 'none');
        $('.card:last-child').find('.vm').css('background-image', 'none');
    } 
    else 
        alert ('Для продолжения сохраните карту')
})

// Удаление карты(тест-ок)
$('#clear').click(function(e) {e.preventDefault()
    if ($('.card').length >1) {
        $(".card:last-child").detach();	
    } else 
    alert ('Оставьте одну карту для редактирования')
})

//Валидация ввода номера карты(тест-ок)
function digits_int(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,16);
    val = val != '' ? val.match(/.{1,4}/g).join(' ') : '';
	$(target).val(val);
    if ($(target).closest('.card').find('#cardcode').val().length==19) {
        $(target).closest('.card').find('#carddate').focus()
    }
}

$(function($){
	$('#cardcode').on('input', function(e){
        digits_int(this)
        numer = $(this).val().replace(" ", "");
        let cardInfo = new CardInfo(numer, {
            banksLogosPath: './node_modules/card-info/dist/banks-logos/',
            brandsLogosPath: './node_modules/card-info/dist/brands-logos/'
        })
        if (numer.length > 5 && cardInfo.bankLogo !==null ) { 
            $(this).closest('.card').css('background-color', cardInfo.backgroundColor)
            $(this).closest('.card').find('.logo').css('background-image', 'url(' + cardInfo.bankLogo + ')');
            $(this).closest('.card').find('.vm').css('background-image', 'url(' + cardInfo.brandLogo + ')');
        }
        else if (numer.length < 6) {
            $(this).closest('.card').css('background-color', '#0140ad')
            $(this).closest('.card').find('.logo').css('background-image', 'none');
            $(this).closest('.card').find('.vm').css('background-image', 'none');
        }
	});
});

//Инпут маск на дату
function digits_int_date(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,4);
    val = val != '' ? val.match(/.{1,2}/g).join('/') : '';
	$(target).val(val);
    if ( $(target).closest('.card').find('#carddate').val().length ==5) {
    $(target).closest('.card').find('#cardname').focus()
    }
}

$(function($){
	$('#carddate').on('input', function(e){
    digits_int_date(this)
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
});

//Проверка символов в инпутах (на проверке)
function checknum(check){
    val = $(check).val();
    val = val !=0 ? $(check).closest('.card').find('.button_cancel').removeClass('button_cancel__off') : $(check).parent().parent().parent().find('.button_cancel').addClass('button_cancel__off');
}

$(function($){
	$('.test1').on('input', function(e){
		checknum(this);
	});    
});

//Проверка всех инпутов на нужные значения
$(function($){
	$('input').on('input', function(e){
        if (
        $(this).closest('.card').find('#cardcode').val().length === 19 &&
        $(this).closest('.card').find('#carddate').val().length === 5 &&
        $(this).closest('.card').find('#cardname').val().length > 2 
        ) {
            $(this).closest('.card').find('.button_ok').removeClass('no__valid')
            valid_card = 1
        }
        else {
            $(this).closest('.card').find('.button_ok').addClass('no__valid')
            valid_card = 2
        }
        
	});
});

//Проверка корректности ввода даты 
$(function($){
	$('#carddate').on('input', function(e){
        if ($(this).parent().find('#carddate').val().substring(3,5) < 50 &&
        $(this).closest('.card').find('#carddate').val().substring(3,5) > 21 &&
        $(this).closest('.card').find('#carddate').val().substring(0,2) < 13 &&
        $(this).closest('.card').find('#carddate').val().substring(0,2) > 0
        ) {
            $(this).closest('.card').find('.gooddate').addClass('valid_good')
        }
        else {
            $(this).closest('.card').find('.gooddate').removeClass('valid_good')
        }
        
	});
});

// Отправка данных
$(function($){
	$('.button_ok').click(function(e){
                let self = $(this)
                $.ajax({
                    url: 'https://testedu.rfixit.ru/ajax/feedback.php',
                    method: 'post',
                    dataType: 'html',
                    data: {cardcode:$(this).parent().find('#cardcode').val(),
                            carddate: $(this).parent().find('#carddate').val(),
                            cardname: $(this).parent().find('#cardname').val()},  
                        success: function(data){
                        if (data == 'error') {
                        alert('Что-то пошло не так')
                    }          
                        else {
                        alert('Данные отправлены')
                    }
                    }
                });
	});
});

$(function($){
	$('#cardcode').on('input', function(e){
                let self = $(this)
                $.ajax({
                    url: 'https://testedu.rfixit.ru/valid.php',
                    method: 'post',
                    dataType: 'html',
                    data: {card:$(this).closest('.card').find('#cardcode').val()},  
                        success: function(data){
                        if (data == 'error') {
                            $(self).closest('.card').find('.goodcard').removeClass('valid_good') 
                        }          
                        else {
                            $(self).closest('.card').find('.goodcard').addClass('valid_good')
                        }
                    }
                });
	});
});

});