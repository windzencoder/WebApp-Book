var koa = require('koa');//引入koa
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view', {
	map: {html: 'ejs'}
});

//静态资源文件的目录的配置
var koa_static = require('koa-static-server');
app.use(koa_static({
	rootDir: './static/',
	rootPath:'/static/',
	maxage:0
}));



//http://127.0.0.1:3001/route_test
app.use(controller.get('/route_test',function*()
{
	this.set('Cache-Control', 'no-cache');
	this.body = 'hello world';
}));

//http://127.0.0.1:3001/ejs_test
app.use(controller.get('/ejs_test',function*()
{
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test', {title:'title_test'});
}));

app.listen(3001);
console.log('koa server is started');