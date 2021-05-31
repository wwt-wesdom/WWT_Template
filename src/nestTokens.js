export default function nestTokens(tokens) {
  // 结果数组
  let nestedTokens = [];
  // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）的tokens数组中当前操作的这个tokens小数组
  let sections = [];
  // 收集器，天生指向nestedTokens结果数组，引用类型值，所以指向的是同一个数组
  // 收集器的指向会变化，当遇见#的时候，收集器会指向这个token的下标为2的新数组
  let collector = nestedTokens;
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    switch (token[0]) {
      case '#':
        sections.push(token);
        // collector置空前引用和nestedTokens相同
        collector.push(token);
        token[2] = collector = [];
        break;
      case '/':
        sections.pop();
        collector = sections.length > 0 ? sections[sections.length -1][2] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }
  return nestedTokens;
}
