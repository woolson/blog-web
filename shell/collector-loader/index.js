/**
* @Author: woolson
* @Date:   2016-11-28 14:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-03-10 15:03:80
*/

var fs = require("fs")
var path = require("path")

module.exports = function(source, map) {
  if(this.cacheable) this.cacheable()

  // 获取CSS路径结果集容器的路径
  var result = path.resolve("allStyles.styl"),
      filePath = this.resourcePath,
      css = fs.readFileSync(result, "utf8")

  if(filePath.indexOf("_common") !== -1) {
    css = "@require \"" + filePath + "\"\n" + css
  }else {
    css += "@require \"" + filePath + "\"\n"
  }

  // 写入结果容器
  fs.writeFileSync(result, css, "utf8")

  return JSON.stringify(source)
}
