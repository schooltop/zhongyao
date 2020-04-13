module Web
  class SessionsController < Devise::SessionsController
    # 前台登录界面
    def new
      super
    end

    # 登录行为
    def create
      resource = warden.authenticate!(scope: resource_name, recall: "#{controller_path}#new")
      set_flash_message(:notice, :signed_in) if is_navigational_format?
      sign_in(resource_name, resource) if resource.is_active?
      respond_to do |format|
        session[:user_id] = current_user.id
        if current_user.is_worker?
          format.html { redirect_to "/" }
        else
          format.html { redirect_to "/home" }
        end  
        format.json { render status: '201', json: resource.as_json(only: [:login, :email, :private_token]) }
      end
    end

    # 登出
    def destroy
      super
    end

    def authenticate

    end

  end
end
