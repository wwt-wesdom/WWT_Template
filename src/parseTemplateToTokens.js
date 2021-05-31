import Scanner from "./scanner";
import nestTokens from './nestTokens'

/**
 * 将模板字符串变为tokens数组
 */
export default function parseTemplateToTokens (templateStr) {
  // 创建扫描器
  const scanner = new Scanner(templateStr);
  let word = '';
  let tokens = [];
  // 让扫描器工作，循环推进指针
  while (!scanner.eos()) {
    // 获取'}}'之后'{{'之前的内容
    word = scanner.scanUtil('{{');
    if (word !== '') {
      let isInJJH = false;
      let _word = '';
      for (let i = 0; i < word.length; i++) {
        if (word[i] === '<') {
          isInJJH = true;
        } else if (word[i] === '>') {
          isInJJH = false;
        }
        // 该项不是空格直接拼接
        if (!/\s/.test(word[i])) {
          _word += word[i]
        } else {
          // 该项是空格，且在标签内部，拼接空格
          if (isInJJH) {
            _word += word[i]
          }
        }
      }
      tokens.push(['text', _word])
    }
    // 指针过'{{'
    scanner.scan('{{');

    //  获取'{{'之后'}}'之前的内容, 双大括号之间的内容
    word = scanner.scanUtil('}}');
    if (word !== '') {
      if (word[0] === '#') {
        tokens.push(['#', word.substring(1)])
      } else if (word[0] === '/') {
        tokens.push(['/', word.substring(1)])
      } else {
        tokens.push(['name', word])
      }
    }
    // 指针过'}}'
    scanner.scan('}}');
  }
  // return tokens;
  return nestTokens(tokens)
}
