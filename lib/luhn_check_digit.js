const luhn = (index, split_numbers) => {
    for (index; index >= 0; index -= 2) {
        if (split_numbers[index]*2 > 9) {
            var double_numbers = split_numbers[index]*2;
            var arr = [...double_numbers+''].map(n=>+n)
            var sum = arr.reduce((a, c) => a + c)
            split_numbers[index] = sum
        } else {
            split_numbers[index] *= 2;
        }
    }
    var total = split_numbers.reduce((a, c) => a + c);

    return total;
};

const generateCheckDigit = (array, user_digits) => {
    var check_digit;
    const { status, position } = user_digits;
    var join_numbers;
    var split_num;
    var len;
    var new_arr = [];
    var total;

    var i;

    if (status === false || (status === true && (position === 'contains' || position === 'startswith'))) {
        join_numbers = array.join("");
        split_num = [...join_numbers+''].map(n=>+n);
        len = split_num.length

        i = len - 1;

        total = luhn(i, split_num);
        
    } 
    else {
        // the user specified digits that should be placed at the endd of the card number
        // so there is little control over what the check digit is
        // Using this, I ensure that the digit eventually returned will not be affected by the doubling
        // when running the numbers through the luhn algorith, just like the check digit is usually not affected. 
        array.map(value => {
            split_num = [...value+''].map(n=>+n);
            len = split_num.length;

            i = array.indexOf(value) === 0 ? len - 1 : len - 2;

            total = luhn(i, split_num);
            new_arr.push(total); 
        });

        total = new_arr.reduce((a, c) => a + c);
    }
    
    if (total % 10 === 0) {
        check_digit = 0;
        return check_digit;
    } else {
        check_digit = 10 - (total % 10);
        return check_digit;
    }
}

// const user_check_digit = (digit, status) => {
//     //
//     if (status === 'startswith') {
        
//     }
// }

module.exports = { generateCheckDigit };