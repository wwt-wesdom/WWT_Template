import parseTemplateToTokens from "./parseTemplateToTokens";
window.WWT_Template = {
  render(templateStr, data) {
    const tokens = parseTemplateToTokens(templateStr);
    console.log(tokens);
  }
}
