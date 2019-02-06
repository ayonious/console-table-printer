function textWithPadding (text, alignment, size) {
    switch (alignment) {
        case 'left': 
            return text.padEnd(size);
        case 'right':
            return text.padStart(size);
         default:
            return text.padStart(size);
    }
}

function createTableHorizontalBorders ({left, mid, right, other}, column_lengths) {
    let ret = left;
    for( let len of column_lengths ) {
        ret += other.repeat(len + 2);
        ret += mid;
    }
    ret = ret.slice(0 , -1);
    ret += right;
    return ret;
}

module.exports = {
    textWithPadding,
    createTableHorizontalBorders
}