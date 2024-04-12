myParseInt = (str) => {
    if (str.length === 0) return NaN;
    const [signFn, delta] = str[0] === '-' ? 
                            [(num) => -num, 1]:
                            [(num) => num, str[0] === '+' ? 1 : 0] 
    const nums = []
    for (let i = delta; i < str.length; i++) {
      const code = str.charCodeAt(i)
      if (code >= 48 && code <= 57) nums.push(code - 48)
      else break;
    }
    const len = nums.length
    if (len === 0) return NaN;
    return signFn(nums.reduce((acc,num, i) => acc +  num * Math.pow(10, len - i - 1), 0))
};
const testData = ['123', '-123', '+123', '12b3', '12+3', '12-3', 'b123', '', '-', '+'];
console.log('Parse Int---------');
testData.forEach(str => {
  console.log('value to parse', str);
  console.log('base parseInt', parseInt(str))
  console.log('my parseInt', myParseInt(str))
})
