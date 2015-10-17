module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
		    dist: {
		        src: [
		            'source/js/vendor/jquery-1.11.3.min.js',
		            'source/js/plugins/*.js',
		            'source/js/script.js'
		        ],
			    dest: 'build/assets/js/script.js',
		    }
        },
		
		uglify: {
			build: {
				src: 'build/assets/js/script.js',
				dest: 'build/assets/js/script.js'
    		}
		},
        
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'source/img/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'build/assets/img/'
		        }]
		    }
		},

		compass: {
			dist: {
				options: {
					sassDir: 'source/sass',
					cssDir: 'build/assets/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'source/sass',
					cssDir: 'build/assets/css'
				}
			}
		},

		svgo: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'source/img/', 
					src: ['**/*.svg'],
					dest: 'build/assets/img/'
				}]
			}
		},		

		watch: {
			options: {
				livereload: false,
    		},			
		    scripts: {
		        files: ['source/js/**/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {},
		    },
			css: {
			    files: ['source/sass/**/*.scss'],
			    tasks: ['compass'],
			    options: {}
			},
			svgo: {
			    files: ['source/img/**/*.svg'],
			    tasks: ['svgo'],
			    options: {}				
			}		     
		}		       
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-svgo');
	
    // grunt default task
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'svgo']);

};