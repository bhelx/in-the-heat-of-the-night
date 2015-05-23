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

set :scss, { :load_paths => [ "assets/css" ] }

call_data = File.read(File.dirname(__FILE__) + '/data/calls-for-service_2015.geojson')

get '/' do
  erb :index
end

get '/calls_data' do
  content_type :json
  call_data
end
