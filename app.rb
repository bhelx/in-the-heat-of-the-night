require 'sinatra'
require 'sinatra/assetpack'
require 'json'

if development?
  require 'sinatra/reloader'
  require 'pry'
end

configure :development do
  register Sinatra::Reloader
end

assets {
  serve '/css',    { :from => 'assets/css' }
  serve '/js',     { :from => 'assets/js' }
  serve '/images', { :from => 'assets/images' }

  css :app, ['css/app.css']
  js  :app, ['js/app.js', 'js/controllers.js', 'js/services.js', 'js/directives.js']

  css_compression :yui
  js_compression  :uglify
}

spot_crime = File.read(File.dirname(__FILE__) + '/data/spot_crime.json')

get '/' do
  erb :index
end

get '/spot_crime' do
  spot_crime
end
