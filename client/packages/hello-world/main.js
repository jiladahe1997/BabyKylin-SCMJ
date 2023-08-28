// main.js

var path = require('path');
var fs = require('fs');

function onBeforeBuildFinish (options, callback) {
    Editor.log('rmr Building ' + options.platform + ' to ' + options.dest); // 你可以在控制台输出点什么

    // var mainJsPath = path.join(options.dest, 'main.js');  // 获取发布目录下的 main.js 所在路径
    // var script = fs.readFileSync(mainJsPath, 'utf8');     // 读取构建好的 main.js
    // script += '\n' + 'window.myID = "01234567";';         // 添加一点脚本到
    // fs.writeFileSync(mainJsPath, script);                 // 保存 main.js

    //删除remote文件夹
    fs.rmdirSync(path.join(options.dest, 'remote'),{ recursive: true, force: true })

    callback();
}

module.exports = {
    load () {
        Editor.Builder.on('build-finished', onBeforeBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('build-finished', onBeforeBuildFinish);
    },
    messages: {
        'say-hello' () {
          Editor.log('Hello World!');
        }
      },
};