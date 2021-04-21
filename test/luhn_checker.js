const validateLuhn = (digits) => {
    //var valid_length = [13, 15, 16, 19]
    var digits_array = [...digits+''].map(n=>+n)
    // if (String(digits).length === 16) {
    //   console.log(`Your credit card number, ${digits}, is already complete.`);
    //   // return luhn_checker(digits);
    // } else {
  

    var array_len = digits_array.length
    for (var i = array_len-2; i >= 0; i -= 2) {
        if (digits_array[i]*2 > 9) {
            var double_num = digits_array[i]*2;
            var arr = [...double_num+''].map(n=>+n)
            var sum = arr.reduce((a, c) => a + c)
            digits_array[i] = sum
        } else {
            digits_array[i] *= 2;
        }
    }

    var total = digits_array.reduce((a, c) => a + c);
    if (total % 10 === 0) {
        return `${digits} is a valid payment card number`;
    } else {
        return `${digits} is not a valid payment card number`
        }
}

module.exports = { validateLuhn }
