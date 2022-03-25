//Маска номера карты
for (var i in ['input', 'change', 'blur', 'keyup']) {
    cardcode.addEventListener('input', formatCardCode, false);
}

function formatCardCode() {
    var cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    this.value = cardCode;
    myform.number.value=this.value.split(" ").join("");
}

//Маска даты
for (var i in ['input', 'change', 'blur', 'keyup']) {
    carddate.addEventListener('input', formatcarddate, false);
}

function formatcarddate() {
    var carddate = this.value.replace(/[^\d]/g, '').substring(0,4);
    carddate = carddate != '' ? carddate.match(/.{1,2}/g).join('/') : '';
    this.value = carddate;
    myform.number.value=this.value.split(" ").join("");
}

//Маска имя пользователя
for (var i in ['input', 'change', 'blur', 'keyup']) {
    cardname.addEventListener('input', formatcardname, false);
}

function formatcardname() {
    var cardname = this.value.replace(/[^\d]/g, '').substring(0,30);
    cardname = cardname != '' ? cardname.match(/\D/g).join('') : '';
    this.value = cardname;
    myform.number.value=this.value.split(" ").join("");
}

//Переключатель фона
$('#new_background').click(function(e) {e.preventDefault()
    $('.card').toggleClass('card__other')
})

//Добавить номер карты
$('#btn_add_number').click(function(e){e.preventDefault()
	$('.number').text(($('#cardcode').val()))
});

//Добавить имя владельца
$('#btn_add_cardname').click(function(e){e.preventDefault()
	$('.cardholder').text(($('#cardname').val()))
});

//Добавить срок действия
$('#btn_add_date').click(function(e){e.preventDefault()
	$('.validdate').text(($('#carddate').val()))
});

// Кнопка очистки всех значения
$('#btn_all_clear').click(function(e){e.preventDefault()
    $('#cardcode').val('')
    $('#cardname').val('')
    $('#carddate').val('')
	$('.number').text('Add card number')
    $('.cardholder').text('Add Name')
    $('.validdate').text('Add date')
    
});

//Дата время
jQuery(function($) {
    setInterval(function() {
    var Months = ['январь', 'февраль', 'Март']
    var date = new Date()  
    var m = Months[date.getMonth()]
    time = date.toLocaleTimeString();
    $(".date").text(`Сейчас ${time}, ${date.getDate()} ${m} ${date.getFullYear()} года`);
    });
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

// result={}
// start = 25025648
// for (i=10;i<=start;i*=10) {
//     result[i] = Math.floor(start/i)
//     )
// }
// result

// VM1073:6 Uncaught SyntaxError: Unexpected token ')'
// result={}
// start = 25025648
// for (i=10;i<=start;i*=10) {
//     result[i] = Math.floor(start/i)

// }
// result

