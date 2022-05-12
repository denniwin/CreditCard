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
        if ( $('.card:last-child').find('#cardcode').val().length === 19 &&
        $('.card:last-child').find('#carddate').val().length === 5 &&
        $('.card:last-child').find('#cardname').val().length > 2 ) 
        {
        $('.card:first-child').clone(true).appendTo(".wrapper");
        $('.card:last-child').find('.test1').val('')
        $('.card:last-child').find('.number__off').text('')
        $('.card:last-child').find('.validdate__off').text('')
        $('.card:last-child').find('.cardholder__off').text('');
        $('.card:last-child').find('.inputvalue__open').removeClass().addClass('inputvalue')
        $('.card:last-child').find('.button_ok, button_settings').removeClass().addClass('button_ok')
        $('.card:last-child').find('.goodcard, goodcard_ok').removeClass().addClass('goodcard')
        $('.card:last-child').find('.gooddate, gooddate_ok').removeClass().addClass('gooddate')
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
    if ($(target).parent().find('#cardcode').val().length==19) {
        $(target).parent().parent().parent().find('#carddate').focus()
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
            $(this).parent().parent().parent().css('background-color', cardInfo.backgroundColor)
            $(this).parent().parent().parent().find('.logo').css('background-image', 'url(' + cardInfo.bankLogo + ')');
            $(this).parent().parent().parent().find('.vm').css('background-image', 'url(' + cardInfo.brandLogo + ')');
        }
        else if (numer.length < 6) {
            $(this).parent().parent().parent().css('background-color', '#0140ad')
            $(this).parent().parent().parent().find('.logo').css('background-image', 'none');
            $(this).parent().parent().parent().find('.vm').css('background-image', 'none');
        }
	});
});

//Инпут маск на дату
function digits_int_date(target){
    val = $(target).val().replace(/[^\d]/g, '').substring(0,4);
    val = val != '' ? val.match(/.{1,2}/g).join('/') : '';
	$(target).val(val);
    if ( $(target).parent().parent().parent().find('#carddate').val().length ==5) {
    $(target).parent().parent().parent().find('#cardname').focus()
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
    val = val !=0 ? $(check).parent().parent().parent().find('.button_cancel').removeClass('button_cancel__off') : $(check).parent().parent().parent().find('.button_cancel').addClass('button_cancel__off');
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
        $(this).parent().parent().parent().find('#cardcode').val().length === 19 &&
        $(this).parent().parent().parent().find('#carddate').val().length === 5 &&
        $(this).parent().parent().parent().find('#cardname').val().length > 2 
        ) {
            $(this).parent().parent().parent().find('.button_ok').removeClass('no__valid')
            valid_card = 1
            console.log(valid_card)
        }
        else {
            $(this).parent().parent().parent().find('.button_ok').addClass('no__valid')
            valid_card = 2
            console.log(valid_card)
        }
        
	});
});

//Проверка корректности ввода даты 
$(function($){
	$('#carddate').on('input', function(e){
        if ($(this).parent().find('#carddate').val().substring(3,5) < 50 &&
        $(this).parent().parent().parent().find('#carddate').val().substring(3,5) > 21 &&
        $(this).parent().parent().parent().find('#carddate').val().substring(0,2) < 13 &&
        $(this).parent().parent().parent().find('#carddate').val().substring(0,2) > 0
        ) {
            $(this).parent().parent().parent().find('.gooddate').addClass('gooddate_ok')
        }
        else {
            $(this).parent().parent().parent().find('.gooddate').removeClass('gooddate_ok')
        }
        
	});
});

// Валидатор на номер карты по методу Луна
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
                        alert('Что-то пошло не так')                        }          
                        else {
                            alert('Данные отправлены')                        }
                    }
                });
	});
});

// чекер

});