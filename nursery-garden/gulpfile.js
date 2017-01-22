var        gulp = require('gulp'),
           less = require('gulp-less'), //less в css
          watch = require('gulp-watch'),//отслеживание изменений кода
    browserSync = require('browser-sync'),//автообновление в браузере
         concat = require('gulp-concat'), //объединение файлов
		cssnano = require('gulp-cssnano'), //минификация css-файлов
		 rename = require('gulp-rename'), //переименование фалов
		 uglify = require('gulp-uglifyjs'), //сжатие js-файлов
   autoprefixer = require('gulp-autoprefixer'); //добавление вендорных префиксов

   
gulp.task('autoprefixer', function(){
  return gulp.src('css/style.css')
	.pipe(autoprefixer({
	  browsers: ['last 10 versions']
	}))
	.pipe(gulp.dest('css/style.css'));
});



//Переводим less в css
gulp.task('less', function() {
  return gulp.src('block-styles/*.less') 
    .pipe(concat('style.less'))  
    .pipe(less())
	.pipe(autoprefixer())
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
});




//Настраиваем локальный сервер для автообновления страницы
gulp.task('browser-sync', function() {
  browserSync({
    server: { // Определяем параметры сервера
    baseDir: '' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});

//Объединяем и минифицируем файлы библиотек скриптов
gulp.task('scripts' , function() {
  return gulp.src([
    'libs/fancybox/source/jquery.fancybox.pack.js',
	'libs/slick/slick/slick.min.js'
  ])
  .pipe(concat('libs.min.js'))  
  .pipe(uglify())
  .pipe(gulp.dest('js'))
});

//Запускаем отслеживание изменений в файлах
gulp.task('watch', ['browser-sync', 'less'], function() {
  gulp.watch('block-styles/*.less', ['less'], browserSync.reload);
  gulp.watch('css/style.css', browserSync.reload);	
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload);  
});



gulp.task('default', ['watch', 'browserSync']);



//При автообновлении проверить пути для файлов со стилями
//Выгрузка в продакшн
//Очистка папок
//Оптимизация изображений
//Кеш для картинок
//Дефолтный таск