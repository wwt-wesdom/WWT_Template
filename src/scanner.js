/**
 * 扫描器类
 */

export default class Scanner {
  constructor(templateStr) {
    // 保持原始数据
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 尾巴，初始值为templateStr
    this.tail = templateStr;
  }

  // 走过指定内容，指针后移，没有返回值
  scan(tag) {
    // 说明tag是在尾巴的第一位
    if (this.tail.indexOf(tag) === 0) {
      // 指针向后位移tag的长度
      this.pos += tag.length;
      // 最后在改变tail
      this.tail = this.templateStr.substring(this.pos);
    }
  }

  // 让指针进行扫描，直到遇到指定的内容结束，并且能够返回结束之前遇到的文字
  scanUtil(stopTag) {
    // 记录一下执行本方法的时候pos的值
    const pos_backup = this.pos;
    // 当尾巴的开头不是stopTag的时候，说明还没有扫描到stopTag
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      // 指针后移
      this.pos ++;
      // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substring(this.pos);
    }
    return this.templateStr.substring(pos_backup, this.pos);
  }
  // 判断指针有么有走到头 返回布尔值，true：到头
  eos() {
    return this.pos >= this.templateStr.length
  }
}
