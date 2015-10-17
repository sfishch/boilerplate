module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
		    dist: {
		        src: [
		            'source/js/vendor/jquery-1.11.3.min.js',
		            'source/js/plugins/*.js', // load all files from the plugins folder
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
		            src: ['**/*.{png,jpg,gif,jpeg}'],
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

		jshint: {
			all: ['Gruntfile.js', 'source/js/script.js']
		},
		
		watch: {
			options: {
				livereload: false,
    		},			
		    scripts: {
		        files: ['source/js/**/*.js'],
		        tasks: ['jshint', 'concat', 'uglify']
		    },
			css: {
			    files: ['source/sass/**/*.scss'],
			    tasks: ['compass']
			},
			svgo: {
			    files: ['source/img/**/*.svg'],
			    tasks: ['svgo']
			}		     
		}		       
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-svgo');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
    // grunt default task
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'svgo', 'imagemin', 'jshint']);
    
};