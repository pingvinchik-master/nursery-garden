var        gulp = require('gulp'),
           less = require('gulp-less'), //less � css
          watch = require('gulp-watch'),//������������ ��������� ����
    browserSync = require('browser-sync'),//�������������� � ��������
         concat = require('gulp-concat'), //����������� ������
		cssnano = require('gulp-cssnano'), //����������� css-������
		 rename = require('gulp-rename'), //�������������� �����
		 uglify = require('gulp-uglifyjs'), //������ js-������
   autoprefixer = require('gulp-autoprefixer'); //���������� ��������� ���������

   
gulp.task('autoprefixer', function(){
  return gulp.src('css/style.css')
	.pipe(autoprefixer({
	  browsers: ['last 10 versions']
	}))
	.pipe(gulp.dest('css/style.css'));
});



//��������� less � css
gulp.task('less', function() {
  return gulp.src('block-styles/*.less') 
    .pipe(concat('style.less'))  
    .pipe(less())
	.pipe(autoprefixer())
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
});




//����������� ��������� ������ ��� �������������� ��������
gulp.task('browser-sync', function() {
  browserSync({
    server: { // ���������� ��������� �������
    baseDir: '' // ���������� ��� ������� - app
    },
    notify: false // ��������� �����������
  });
});

//���������� � ������������ ����� ��������� ��������
gulp.task('scripts' , function() {
  return gulp.src([
    'libs/fancybox/source/jquery.fancybox.pack.js',
	'libs/slick/slick/slick.min.js'
  ])
  .pipe(concat('libs.min.js'))  
  .pipe(uglify())
  .pipe(gulp.dest('js'))
});

//��������� ������������ ��������� � ������
gulp.task('watch', ['browser-sync', 'less'], function() {
  gulp.watch('block-styles/*.less', ['less'], browserSync.reload);
  gulp.watch('css/style.css', browserSync.reload);	
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload);  
});



gulp.task('default', ['watch', 'browserSync']);



//��� �������������� ��������� ���� ��� ������ �� �������
//�������� � ��������
//������� �����
//����������� �����������
//��� ��� ��������
//��������� ����