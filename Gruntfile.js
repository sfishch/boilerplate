module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
		    dist: {
		        src: [
		            '<%= pkg.sourceDir %>/js/vendor/jquery-1.11.3.min.js',
		            '<%= pkg.sourceDir %>/js/plugins/*.js', // load all files from the plugins folder
		            '<%= pkg.sourceDir %>/js/maps.js',
		            '<%= pkg.sourceDir %>/js/script.js'
		        ],
			    dest: '<%= pkg.buildDir %>/js/script.js',
		    }
        },
		
		uglify: {
			build: {
				src: '<%= pkg.buildDir %>/js/script.js',
				dest: '<%= pkg.buildDir %>/js/script.js'
    		}
		},

		compass: {
			dist: {
				options: {
					sassDir: '<%= pkg.sourceDir %>/sass',
					cssDir: '<%= pkg.buildDir %>/css',
					environment: 'production',
					outputStyle: 'compressed'
				}
			},
			dev: {
				options: {
					sassDir: '<%= pkg.sourceDir %>/sass',
					cssDir: '<%= pkg.buildDir %>/css',
					outputStyle: 'expanded'
				}
			},
		},

		svgo: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '<%= pkg.sourceDir %>/img/', 
					src: ['**/*.svg'],
					dest: '<%= pkg.buildDir %>/img/'
				}]
			}
		},

		jshint: {
			all: ['Gruntfile.js', '<%= pkg.sourceDir %>/js/script.js']
		},
		
		watch: {
			options: {
				livereload: false,
    		},			
		    scripts: {
		        files: ['<%= pkg.sourceDir %>/js/**/*.js'],
		        tasks: ['jshint', 'concat', 'uglify']
		    },
			css: {
			    files: ['<%= pkg.sourceDir %>/sass/**/*.scss'],
			    tasks: ['compass:dev']
			},
			svgo: {
			    files: ['<%= pkg.sourceDir %>/img/**/*.svg'],
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
	
    // grunt default task (= development)
    grunt.registerTask('default', ['concat', 'uglify', 'compass:dist', 'svgo', 'jshint']);
    
    // grunt build task
    grunt.registerTask('build', ['concat', 'uglify', 'compass:dist', 'svgo', 'jshint']);
    
};