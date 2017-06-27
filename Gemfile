source 'https://rubygems.org'
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end
# source 'https://gems.ruby-china.org'

gem 'rails', '>= 5.0.0.rc2', '< 5.1'
gem 'puma', '3.6.2'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt'
gem 'sidekiq'
gem 'rake'

# Assets
gem 'sass-rails', github: 'rails/sass-rails'
gem 'sprockets', '4.0.0.beta4'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
# gem 'rails-ujs'
gem 'asset_sync', github: 'whmall/asset_sync'
gem 'non-stupid-digest-assets'
gem 'turbolinks'

# Login & Authority
gem 'devise', git: 'https://github.com/plataformatec/devise.git'
gem 'cancancan'
gem 'rolify'

# Store
gem 'mysql2'
gem 'mongo'
gem 'hiredis'
gem 'redis'
gem 'redis-objects'
gem 'redis-namespace'
gem 'dalli'


# Search
gem 'elasticsearch-model'
gem 'elasticsearch-rails'

#Third Part
gem 'httparty'
gem 'jwt'

gem 'meta-tags'
gem 'simple_form'
gem 'carrierwave'
gem 'remotipart', '~> 1.2'
gem 'sitemap_generator'
gem 'spreadsheet'
gem 'roo', require: false, github: 'whmall/roo'
gem 'whenever', :require => false
gem 'kaminari', github: 'amatsuda/kaminari'
gem 'default_where', github: 'whmall/default_where'
gem 'csv-importer', github: 'xor3/csv-importer'
gem 'roo-xls', github: 'roo-rb/roo-xls'
gem 'cocoon'
gem 'savon'
gem 'seventeen_mon'

# Engines
gem 'the_notify', github: 'whmall/the_notify', tag: 'v0.7.1'
gem 'rails_log', github: 'qinmingyuan/rails_log', tag: 'v2.0'
gem 'rails_com', github: 'qinmingyuan/rails_com', tag: 'v0.7.3'  # 通用的helper，model等方法
gem 'default_form', github: 'qinmingyuan/default_form', tag: 'v2.4'

#gem 'default_form', path: '~/work/default_form'
#gem 'the_notify', path: '~/work/the_notify'
#gem 'rails_com', path: '~/work/engine/rails_com'
#gem 'rails_log', path: '~/work/engine/rails_log'

group :development, :test do
  gem 'factory_girl'
  gem 'factory_girl_rails'
  gem 'pry-rails'
  gem 'database_cleaner'
  gem 'byebug', platform: :mri
  gem 'pry-byebug'
  gem 'ruby-progressbar'
  gem 'awesome_print'
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console'
  gem 'mina', '1.0.6'
  gem 'mina-whenever'
end

gem 'prawn'
gem 'prawn-table'
gem 'barby'


gem 'wechat'
gem 'wx_pay'
gem 'omniauth-wechat-oauth2'
gem 'rqrcode'
gem 'qiniu'
gem 'alipay', '~> 0.12.0'
gem 'psych', '2.2.2'
