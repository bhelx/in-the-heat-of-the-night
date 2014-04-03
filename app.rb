require 'sinatra'
require 'sinatra/assetpack'

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
  js  :app, ['js/spin.min.js', 'js/app.js']

  css_compression :yui
  js_compression  :uglify
}

set :public_folder, File.dirname(__FILE__) + '/static'

get '/' do
  erb :index
end
