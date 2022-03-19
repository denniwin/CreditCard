
for (var i in ['input', 'change', 'blur', 'keyup']) {
    cardcode.addEventListener('input', formatCardCode, false);
}

function formatCardCode() {
    var cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    this.value = cardCode;
    myform.number.value=this.value.split(" ").join("");
}


$ ('.card').click(function() {
// if ($(this).hasClass ('card__gray')){
//     $(this).removeClass ('card__gray')   
// }
// else {
//     $(this).addClass('card__gray')
// }
$(this).toggleClass('card__gray')
})

var date = new Date ()
$('.date').text(`Сегодня ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`)

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

