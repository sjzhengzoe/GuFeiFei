exports.log = (title, type = 'red', text) => {
    text = text ? text : '';
    switch (type) {
        case 'success':
            console.log("\033[42;30m " + title + " \033[0m " + "\033[32m " + text + " \033[0m" + '\n'); //绿地黑字
            break;
        case 'warn':
            console.log("\033[43;30m " + title + " \033[0m " + text + '\n'); //黄底黑字
            break;
        case 'fail':
            console.log("\033[41;30m " + title + " \033[0m " + text + '\n'); //红底黑字
            break;
        case 'green':
            console.log("\033[32m " + title + " \033[0m" + text + '\n'); //绿色字
            break;
        case 'red':
            console.log("\033[31m " + title + " \033[0m" + text + '\n'); //红色字
            break;
        case 'black':
            console.log("\033[30m " + title + " \033[0m" + text + '\n'); //黑色字
            break;
        case 'yellow':
            console.log("\033[33m " + title + " \033[0m" + text + '\n'); //黄色字
            break;
        default:
            console.log(title, text);
            break;
    }
}

