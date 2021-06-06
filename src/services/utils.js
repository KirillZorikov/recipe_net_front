export default function generatePaginatorArray(end, current) {
    let start = 0;
    let array = [...Array(end + 1).keys()].slice(1);
    let replaceCount = 1;
    if (current - start > 3) {
        replaceCount = current - start - 3;
        array.splice(1, replaceCount, '...');
    }
    if (end - current > 2) {
        array.splice(current - replaceCount + 2, end - current -2, '...')
    }
    return array
}
